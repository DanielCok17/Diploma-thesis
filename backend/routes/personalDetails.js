const express = require('express');
const router = express.Router();
const PersonalDetails = require('../models/PersonalDetails'); // Nastavte správnu cestu k súboru modelu

router.post('/', async (req, res) => {
    const { vin, name, address, bloodType, insurance_company } = req.body;

    if (!vin || !name || !address || !bloodType || !insurance_company) {
        return res.status(400).send('All fields are required');
    }

    try {
        const updatedDetails = await PersonalDetails.findOneAndUpdate(
            { vin: vin },
            { $set: { name, address, bloodType, insurance_company } },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedDetails);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.get('/:vin', async (req, res) => {
    const { vin } = req.params;

    if (!vin) {
        return res.status(400).send('VIN is required');
    }

    try {
        const details = await PersonalDetails.findOne({ vin: vin });
        if (details) {
            res.status(200).json(details);
        } else {
            res.status(404).send('No personal details found for the provided VIN');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
