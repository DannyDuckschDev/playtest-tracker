//backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); //import bcrypt for password comparison
const User = require('../models/User');
require('dotenv').config(); // load environment variable

//Registration new user
router.post('/register', async(req, res) => {
    const {username, email, password} = req.body;

    try {
        //Check if user already exists
        let user = await User.findOne({ where: {email} });
        if (user) {
            return res.status(400).json({ msg: 'User already exists'});
        }

        //Create new user
        user = await User.create({
            username,
            email,
            password
        });

        //Create JWT-Token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Login for existing users
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        //Check if user already exists
        let user = await User.findOne({ where : { email} });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid login data!'});
        }

        //Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid login data'});
        }

        //Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '1h'},
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;