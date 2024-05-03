const express = require('express');
const router = express.Router();
const RescueCenter = require('../models/RescueCenter'); // Make sure the path to the RescueCenter model is correct
const User = require('../models/User'); // Make sure the path to the User model is correct

// Create a new rescue center
router.post('/', async (req, res) => {
    const { name, address, contactNumber, area, userId } = req.body;

    if (!name || !address || !contactNumber || !area || !userId) {
        // log missing fields
        return res.status(400).send('All fields are required');
    }

    try {
        const newCenter = new RescueCenter({
            name,
            address,
            contactNumber,
            area,
            userId
        });
        await newCenter.save();
        res.status(201).json(newCenter);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get all rescue centers
router.get('/', async (req, res) => {
    try {
        const centers = await RescueCenter.find()

        // get all userId from centers
        const userIds = centers.map(center => center.userId);

       // give me username of all userIds
         const users = await User.find({ _id: { $in: userIds } });
          // Map through centers to add username based on personalInfo
          const centersWithUsername = centers.map(center => {
            // Find the user associated with the center
            const associatedUser = users.find(user => user._id.equals(center.userId));

            // Construct username from personalInfo
            const username = `${associatedUser.personalInfo.firstName} ${associatedUser.personalInfo.lastName}`;

            // Add username field to center object
            return {
                ...center.toObject(), // Convert Mongoose object to plain JavaScript object
                username
            };
        });


        // Send response with centers including username
        res.status(200).json(centersWithUsername);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get rescue center by userId
router.get('/user/:userId', async (req, res) => {
    console.log('here');
    const { userId } = req.params;

    try {
        const centers = await RescueCenter.findOne({ userId: userId });
        if (!centers) {
            return res.status(404).send('Rescue center not found');
        }
        console.log(centers);
        res.status(200).json(centers);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get a single rescue center by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const center = await RescueCenter.findById(id).populate('userId', 'username');
        if (!center) {
            return res.status(404).send('Rescue center not found');
        }
        res.status(200).json(center);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a rescue center
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, address, contactNumber, area, userId } = req.body;

    try {
        const updatedCenter = await RescueCenter.findByIdAndUpdate(id, {
            name, 
            address, 
            contactNumber, 
            area, 
            userId
        }, { new: true });

        if (!updatedCenter) {
            return res.status(404).send('Rescue center not found');
        }
        res.status(200).json(updatedCenter);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a rescue center
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCenter = await RescueCenter.findByIdAndDelete(id);
        if (!deletedCenter) {
            return res.status(404).send('Rescue center not found');
        }
        res.status(200).send('Rescue center deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
