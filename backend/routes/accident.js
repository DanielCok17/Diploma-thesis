const express = require('express');
const router = express.Router();
const AccidentReport = require('../models/Accident'); // Nastavte správnu cestu k súboru modelu
const { assessAndDispatch } = require('../utils/accidentSeverity');
const { assignAccidentToUser, endAccident } = require('../utils/assignAccident');
const { startAccidentDataStream, addNewAccident }  = require('../utils/simulateNewAccident');

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

router.get('/vin/:vin', async (req, res) => {
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

// all accidents with status pending
router.get('/pending', async (req, res) => {
    try {
        const accidents = await AccidentReport.find({ status: 'pending' });
        res.status(200).json(accidents);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// all accidents with status assigned
router.get('/assigned', async (req, res) => {
    try {
        const accidents = await AccidentReport.find({ status: 'assigned' });
        res.status(200).json(accidents);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// update accident status
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedAccident = await AccidentReport.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedAccident) {
            return res.status(404).send('Accident not found');
        }

        res.status(200).json(updatedAccident);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
);

// get accident by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const accident = await AccidentReport.findOne({ _id: id });
        if (!accident) {
            return res.status(404).send('Accident not found');
        }
        res.status(200).json(accident);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
);

// update rescuerIds for accident
router.put('/:id/rescuers', async (req, res) => {
    const { id } = req.params;
    const { rescuerIds } = req.body;

    try {
        const updatedAccident = await AccidentReport.findByIdAndUpdate(id, { rescuerIds }, { new: true });
        if (!updatedAccident) {
            return res.status(404).send('Accident not found');
        }

        res.status(200).json(updatedAccident);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
);

// test for severity
router.get('/test/testSeverity', async (req, res) => {
    // just call the function
    const accidentId = '6634f0485a3b998225d69910';
    await assessAndDispatch(accidentId);

    res.status(200).send('Test successful');
});

// test for assigning accident
router.get('/test/assignAccidentToUser', async (req, res) => {
    // just call the function
    await assignAccidentToUser('6634f0485a3b998225d69910');

    res.status(200).send('Test successful');
});

// test for ending accident
router.get('/test/endAccident', async (req, res) => {
    // just call the function
    await endAccident('6634f0485a3b998225d69910');

    res.status(200).send('Test successful');
});

// accident details - all users and rescue units assigned to the accident
router.get('/details/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const accident = await AccidentReport.findById(id).populate('assignedUsers').populate('rescuerIds');
        if (!accident) {
            return res.status(404).send('Accident not found');
        }
        res.status(200).json(accident);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
);

// accidet/user/:id - get all accidents assigned to the user
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const accidents = await AccidentReport.findOne({ assignedUsers: userId });
        res.status(200).json(accidents);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
);


// accident/${accident._id}/status`, { status: "busy" 
router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedAccident = await AccidentReport.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedAccident) {
            return res.status(404).send('Accident not found');
        }

        res.status(200).json(updatedAccident);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
);

// Create HTTP server for WebSocket connection
const http = require('http');
const server = http.createServer(router);

// Initialize WebSocket server for streaming accident data
startAccidentDataStream(server);

router.get('/testAccident/test', async (req, res) => {
    console.log('Adding new accident and starting data stream...');
    try {
        // Add a new accident record to the database
        const newAccident = await addNewAccident();

        // also call the function to start data stream
        startAccidentDataStream(server);

        

        // Respond with a success message
        res.json({
            message: 'New accident has been added and data streaming has started.',
            accidentDetails: newAccident
        });
    } catch (error) {
        console.error('Error in adding accident and starting data stream:', error);
        res.status(500).json({ error: 'Failed to process the request.' });
    }
});



module.exports = router;

