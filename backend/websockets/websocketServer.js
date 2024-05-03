require('dotenv').config();
const WebSocket = require('ws');
const AccidentStream = require('../models/AccidentStream'); // Adjust the path as needed

function startWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        //   console.log('Client connected');

        ws.on('message', async (message) => {

            const data = JSON.parse(message); // Parse the JSON string to an object
            const vin = data.vin; // Access the 'vin' property
            const passengers = data.passengers; // Access the 'passengers' property
        

            // Create a document instance using the model and save it to the database
            const accidentStream = new AccidentStream({ vin, passengers });
            const savedAccidentStream = await accidentStream.save();

            let isBinary = Buffer.isBuffer(message);

            if (isBinary) {
                // Assuming binary data is in the form of a stringified JSON
                try {
                    message = JSON.parse(Buffer.from(message).toString());
                    isBinary = false;  // Now the message is a JavaScript object, not binary
                } catch (err) {
                    console.error('Failed to parse binary data to JSON:', err);
                    return;  // Stop further processing if the conversion fails
                }
            }

            // Convert the message to a string if it's a JSON object
            if (typeof message === 'object' && !isBinary) {
                message = JSON.stringify(message);
            }

            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    // If the original message was binary and successfully converted to JSON, send as text
                    client.send(message, { binary: isBinary });
                }
            });
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });

    });

    AccidentStream.watch().on('change', (change) => {
        console.log('Change detected:', change);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(change));
            }
        });
    });
}




module.exports = startWebSocketServer;
