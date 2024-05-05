const WebSocket = require('ws');
const mongoose = require('mongoose');
const Accident = require('../models/Accident'); // Adjust the path as needed

async function addNewAccident() {
    const newAccident = {
        timestamp: new Date("2024-04-22T12:00:00Z"),
        vin: "1HGCM82633A004350",
        last_timestamp_check: new Date("2024-04-22T11:55:00Z"),
        acceleration: 6.5,
        speed: 10,
        license_plates: ["ABC123", "XYZ789"],
        coordinates: [48.183527, 17.133058],
        violations: [{
            type: "speeding",
            coordinates: [48.183527, 17.133058],
            timestamp: new Date("2024-04-22T12:00:00Z")
        }],
        driver: {
            seatbelt: true,
            drowsiness: false,
            heart_rate: [72, 76, 75]
        },
        passengers_num: 3
    };

    try {
        const accident = new Accident(newAccident);
        const savedAccident = await accident.save();
        console.log('New accident added:', savedAccident);
        return savedAccident;
    } catch (error) {
        console.error('Failed to add new accident:', error);
        throw error;
    }
}

function startAccidentDataStream(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected to the WebSocket server.');

        ws.on('message', async (message) => {
            let data;
            try {
                data = JSON.parse(message); // Parse the JSON string to an object
            } catch (err) {
                console.error('Failed to parse message:', err);
                return; // If the message isn't valid JSON, stop processing
            }

            // Handling the incoming message
            const { vin, passengers } = data;
            try {
                const savedAccidentStream = await new AccidentStream({ vin, passengers }).save();
                console.log('Saved accident stream:', savedAccidentStream);
            } catch (err) {
                console.error('Failed to save accident stream:', err);
            }

            // Broadcast the message to other clients
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message); // Send the original message to other clients
                }
            });
        });

        // Simulating accident data for 20 seconds
        const intervalId = setInterval(() => {
            const simulatedData = {
                "vin": "1HGCM82633A004352",
                "passengers": [
                    { "heart_rate": Math.floor(Math.random() * (180 - 60) + 60) },
                    { "heart_rate": Math.floor(Math.random() * (180 - 60) + 60) }
                ]
            };

            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify(simulatedData));
            }
        }, 1000);

        // Stop sending data after 20 seconds
        setTimeout(() => {
            clearInterval(intervalId);
            console.log('Stopped sending data after 20 seconds.');
        }, 20000);

        ws.on('close', () => {
            console.log('Client disconnected');
            clearInterval(intervalId);
        });
    });

    console.log('WebSocket server started.');
}

module.exports = {startAccidentDataStream, addNewAccident};
