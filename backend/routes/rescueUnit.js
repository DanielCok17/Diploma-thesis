const express = require('express');
const router = express.Router();
const RescueUnit = require('../models/RescueUnit'); // Upravte podľa potreby cestu k modelu
const User = require('../models/User'); // Upravte podľa potreby cestu k modelu

// Pridanie nového vozidla
router.post('/', async (req, res) => {
    const { type, rescueCenterId, userId, status } = req.body;
    try {
        const newVehicle = new RescueUnit({ type, rescueCenterId, userId, status });
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// // Získanie všetkých vozidiel
// router.get('/', async (req, res) => {
//     try {
//         const vehicles = await RescueUnit.find();

//         res.status(200).json(vehicles);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });

router.get('/', async (req, res) => {
    try {
        // Získanie všetkých vozidiel
        const vehicles = await RescueUnit.find().populate('rescueCenterId');

        // Zozbieranie všetkých userID z vozidiel
        const userIds = vehicles.map(vehicle => vehicle.userId);

        // Získanie užívateľov podľa ich ID
        const users = await User.find({ _id: { $in: userIds } });

        // Pridanie mena užívateľa k vozidlám
        const vehiclesWithUsernames = vehicles.map(vehicle => {
            // Nájdenie priradeného užívateľa k vozidlu
            const associatedUser = users.find(user => user._id.equals(vehicle.userId));

            // Konštrukcia mena z osobných informácií
            const username = `${associatedUser.personalInfo.firstName} ${associatedUser.personalInfo.lastName}`;

            // Pridanie mena užívateľa do objektu vozidla
            return {
                ...vehicle.toObject(), // Konverzia Mongoose objektu na čistý JavaScript objekt
                username  // Pridanie mena
            };
        });

        res.status(200).json(vehiclesWithUsernames);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Získanie konkrétneho vozidla
router.get('/:id', async (req, res) => {
    try {
        const vehicle = await RescueUnit.findById(req.params.id).populate('rescueCenterId').populate('userId');
        if (!vehicle) {
            return res.status(404).send('Vehicle not found');
        }
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Aktualizácia vozidla
router.put('/:id', async (req, res) => {
    const { type, rescueCenterId, userId, status, accidentId, defaultLocation, currentLocation } = req.body;
    try {
        const updatedVehicle = await RescueUnit.findByIdAndUpdate(req.params.id, { type, rescueCenterId, userId, status, accidentId, defaultLocation, currentLocation }, { new: true });
        if (!updatedVehicle) {
            return res.status(404).send('Vehicle not found');
        }
        res.status(200).json(updatedVehicle);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Odstránenie vozidla
router.delete('/:id', async (req, res) => {
    try {
        const deletedVehicle = await RescueUnit.findByIdAndDelete(req.params.id);
        if (!deletedVehicle) {
            return res.status(404).send('Vehicle not found');
        }
        res.status(200).send('Vehicle deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
