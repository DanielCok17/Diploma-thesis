const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure the path to the User model is correct
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Environment variables should be defined to manage secrets
const JWT_SECRET = process.env.JWT_SECRET;

// Register User
router.post('/register', async (req, res) => {
    const { username, password, role, firstName, lastName, phoneNumber } = req.body;

    // Check for required fields
    if (!username || !password || !role || !firstName || !lastName || !phoneNumber) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(409).send('username already in use');
        }

        const newUser = new User({
            username,
            password, // This will be hashed in the pre-save middleware
            role,
            personalInfo: { firstName, lastName, phoneNumber }
        });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('username and password are required');
    }

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token: token, role : user.role , userId : user._id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get All Users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get user only with role dispatcher
router.get('/dispatcher', async (req, res) => {
    try {
        const users = await User.find({ role: 'dispatcher' });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get User by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update User
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete User
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (user) {
            res.status(200).send('User deleted successfully');
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get by role
router.get('/role/:role', async (req, res) => {
    let { role } = req.params;

    if (role == 'Police') {
        role = 'policeman';
    }

    //if Fire than change to firefighter
    if (role == 'Fire') {
        role = 'firefighter';
    }

    //if Ambulance than change to rescuer
    if (role == 'Ambulance') {
        role = 'rescuer';
    }

    try {
        const users = await User.find({ role: role });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
