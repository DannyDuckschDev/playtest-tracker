// backend/routes/authRoutes.ts

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Import bcrypt for password comparison
import { check, validationResult } from 'express-validator'; // Import express-validator
import User from '../models/User';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const router = express.Router();

// Define an interface for the JWT payload to ensure typing
interface JwtPayload {
    user: {
        id: number;
    };
}

// Route for registering a new user
router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 8 characters long').isLength({ min: 8 })
    ],
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { username, email, password } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ where: { email } });
            if (user) {
                res.status(400).json({ msg: 'User already exists' });
                return;
            }

            // Create new user
            user = await User.create({
                username,
                email,
                password
            });

            // Create JWT token
            const payload: JwtPayload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            const error = err as Error;
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

// Route for logging in existing users
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').notEmpty(),
        check('password', 'Password must be at least 8 characters long').isLength({ min: 8 })
    ],
    async (req: Request, res: Response): Promise<void> => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { email, password } = req.body;

        try {
            // Check if user exists
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(400).json({ msg: 'Invalid login data!' });
                return;
            }

            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({ msg: 'Invalid login data' });
                return;
            }

            // Generate JWT token
            const payload: JwtPayload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET as string,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            const error = err as Error;
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);

export default router;
