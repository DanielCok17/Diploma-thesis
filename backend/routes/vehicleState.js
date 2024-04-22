const express = require('express');
const router = express.Router();
const VehicleState = require('../models/VehicleState');  // Upravte cestu podľa skutočnej umiestnenia modelu

// Pridanie nového stavu k existujúcemu VIN alebo vytvorenie nového záznamu
router.post('/', async (req, res) => {
  const { vin, states } = req.body;

  if (!vin || !states || !Array.isArray(states) || states.length === 0) {
    return res.status(400).send('VIN and states are required, and states must be a non-empty array.');
  }

  try {
    const updatedVehicle = await VehicleState.findOneAndUpdate(
      { vin: vin },
      { $push: { states: { $each: states } } }, // Pridanie viacerých stavov naraz
      { new: true, upsert: true }
    );
    res.status(201).json(updatedVehicle);
  } catch (error) {
    res.status(500).send(`Error saving vehicle state: ${error.message}`);
  }
});

// Získanie posledného záznamu stavu pre dané VIN
router.get('/:vin', async (req, res) => {
  const { vin } = req.params;

  try {
    const vehicleData = await VehicleState.findOne({ vin });
    if (vehicleData && vehicleData.states.length > 0) {
      res.status(200).json(vehicleData);
    } else {
      res.status(404).send('No vehicle state found for this VIN');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
