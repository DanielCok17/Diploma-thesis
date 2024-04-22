const express = require('express');
const router = express.Router();
const AccidentReport = require('../models/Accident'); // Nastavte správnu cestu k súboru modelu

router.post('/', async (req, res) => {
    const {
        timestamp,
        vin,
        last_timestamp_check,
        acceleration,
        speed,
        license_plates,
        coordinates,
        violations,
        driver,
        passengers_num
    } = req.body;

    // Kontrola povinných polí
    if (!timestamp || !vin || !last_timestamp_check || !acceleration || !speed ||
        !license_plates || !coordinates || !driver || passengers_num === undefined) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const newAccidentReport = new AccidentReport({
            timestamp,
            vin,
            last_timestamp_check,
            acceleration,
            speed,
            license_plates,
            coordinates,
            violations,
            driver,
            passengers_num
        });
        await newAccidentReport.save();
        res.status(200).json(newAccidentReport);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Získanie všetkých nehôd

router.get('/allAccidents', async (req, res) => {
    try {
        const accidents = await AccidentReport.find();
        res.status(200).json(accidents);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
);

// Získanie nehody podľa VIN

router.get('/:vin', async (req, res) => {
    const { vin } = req.params;
    if (!vin) {
        return res.status(400).send('VIN is required');
    }

    try {
        const accident = await AccidentReport.findOne({ vin: vin });
        if (accident) {
            res.status(200).json(accident);
        } else {
            res.status(404).send('No accident found for the provided VIN');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}
);

module.exports = router;

