const express = require('express');
const router = express.Router();
const AccidentModel = require('../models/Accident');

router.post('/accident-data', async (req, res) => {
    try {
        const newAccidentData = new AccidentModel(req.body);
        await newAccidentData.save();
        res.status(201).send(newAccidentData);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/accident-data', async (req, res) => {
    try {
        const accidentData = await AccidentModel.find();
        res.status(200).send(accidentData);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/accident-data/:id', async (req, res) => {
    try {
        const accidentData = await AccidentModel.findById(req.params.id);
        if (!accidentData) {
            return res.status(404).send();
        }
        res.send(accidentData);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/accident-data/:id', async (req, res) => {
    try {
        const accidentData = await AccidentModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!accidentData) {
            return res.status(404).send();
        }
        res.send(accidentData);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/accident-data/:id', async (req, res) => {
    try {
        const accidentData = await AccidentModel.findByIdAndDelete(req.params.id);
        if (!accidentData) {
            return res.status(404).send();
        }
        res.send(accidentData);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;



