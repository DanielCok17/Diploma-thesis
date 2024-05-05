const express = require('express');
const router = express.Router();
const ClosedAccident = require('../models/ClosedAccident'); // Adjust the path as necessary to your models directory

// Post a new closed accident
router.post('/', async (req, res) => {
    try {
        const newClosedAccident = new ClosedAccident(req.body);
        const savedAccident = await newClosedAccident.save();
        res.status(201).send(savedAccident);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all closed accidents
router.get('/', async (req, res) => {
    try {
        const accidents = await ClosedAccident.find()
        res.status(200).send(accidents);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific closed accident by ID
router.get('/:id', async (req, res) => {
    try {
        const accident = await ClosedAccident.findById(req.params.id);
        if (!accident) {
            return res.status(404).send({ message: 'Accident not found' });
        }
        res.status(200).send(accident);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a closed accident
router.put('/:id', async (req, res) => {
    try {
        const accidentUpdate = await ClosedAccident.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!accidentUpdate) {
            return res.status(404).send({ message: 'Accident not found for updating' });
        }
        res.status(200).send(accidentUpdate);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get by accident id
router.get('/accident/:id', async (req, res) => {
    try {
        const accident = await ClosedAccident.findOne({ accidentId: req.params.id });
        if (!accident) {
            return res.status(404).send({ message: 'Accident not found' });
        }
        res.status(200).send(accident);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
