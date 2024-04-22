require('dotenv').config();
const WebSocket = require('ws');
const AccidentStream = require('../models/AccidentStream'); // Upravte cestu podľa skutočnej umiestnenia modelu

function startWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws) {
        console.log('Client connected to WebSocket /accident-stream');

        ws.on('message', async function incoming(message) {
            let data;
            try {
                data = JSON.parse(message);
            } catch (error) {
                console.log('Error parsing message:', error);
                ws.send(JSON.stringify({ error: 'Invalid JSON format' }));
                return;
            }

            if (!data.vin) {
                ws.send(JSON.stringify({ error: 'VIN is required' }));
                return;
            }

            try {
                const accidentStream = new AccidentStream(data);
                await accidentStream.save();
                ws.send(JSON.stringify({ message: 'Data saved successfully', data: accidentStream }));
            } catch (saveError) {
                console.log('Error saving data:', saveError);
                ws.send(JSON.stringify({ error: 'Failed to save data' }));
            }
        });

        ws.on('close', () => {
            console.log('WebSocket client disconnected');
        });
    });
}

module.exports = startWebSocketServer;
