//backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
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

module.exports = router;