const express = require('express');
const router = express.Router();
const ContactsData = require('../models/Contacts');

router.post('/', async (req, res) => {
    const { vin, contacts } = req.body;
    if (!vin || !contacts || !contacts.length) {
        return res.status(400).send('Missing vin or contacts information');
    }

    try {
        const updatedContacts = await ContactsData.findOneAndUpdate(
            { vin: vin },
            { $set: { contacts: contacts } },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedContacts);
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
        const contactData = await ContactsData.findOne({ vin: vin });
        if (contactData) {
            res.status(200).json(contactData);
        } else {
            res.status(404).send('No contacts found for the provided VIN');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// edit the contacts
router.put('/:vin', async (req, res) => {
    const { vin } = req.params;
    const { contacts } = req.body;
    if (!vin || !contacts || !contacts.length) {
        return res.status(400).send('Missing vin or contacts information');
    }

    try {
        const updatedContacts = await ContactsData.findOneAndUpdate(
            { vin: vin },
            { $set: { contacts: contacts } },
            { new: true }
        );
        res.status(200).json(updatedContacts);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;

