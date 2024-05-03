// require('dotenv').config();
// const WebSocket = require('ws');
// const AccidentStream = require('../models/AccidentStream'); // Adjust the path as needed

// function startWebSocketServer(server) {
//     const wss = new WebSocket.Server({ server });

//     wss.on('connection', ws => {
//         console.log('Client connected to WebSocket /accident-stream');

//         ws.on('message', async (message) => {
//             let data;
//             try {
//                 console.log('Received message:', message);
//                 data = JSON.parse(message);
//             } catch (error) {
//                 console.error('Error parsing message:', error);
//                 ws.send(JSON.stringify({ error: 'Invalid JSON format' }));
//                 return;
//             }

//             // Validate data
//             if (!data.vin) {
//                 ws.send(JSON.stringify({ error: 'VIN is required' }));
//                 return;
//             }

//             // Process data
//             try {
//                 const accidentStream = new AccidentStream(data);
//                 await accidentStream.save();
//                 ws.send(JSON.stringify({ message: 'Data saved successfully', data }));
//             } catch (error) {
//                 console.error('Error saving data:', error);
//                 ws.send(JSON.stringify({ error: 'Failed to save data', details: error.message }));
//             }
//         });

//         ws.on('close', () => {
//             console.log('WebSocket client disconnected');
//         });

//         ws.onerror = (error) => {
//             console.error('WebSocket error:', error);
//         };
//     });
// }

// module.exports = startWebSocketServer;

const WebSocket = require('ws');
const AccidentStreamSchema = require('../models/AccidentStream'); // Adjust the path and schema definition as needed

function startWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket /accident-stream');

    ws.on('message', async (message) => {
      let data;
      try {
        console.log('Received message:', message);
        data = JSON.parse(message);
      } catch (error) {
        console.error('Error parsing message:', error);
        ws.send(JSON.stringify({ error: 'Invalid JSON format' }));
        return;
      }

      // Validate data
      if (!data.vin) {
        ws.send(JSON.stringify({ error: 'VIN is required' }));
        return;
      }

      // Extract and process heart rate (if present)
      const heartRate = data.heartRate; // Assuming 'heartRate' property exists in the message

      if (heartRate) {
        try {
          // Assuming 'AccidentStreamSchema' is a valid Mongoose model or similar
          const accidentStream = new AccidentStreamSchema(data);
          // Assuming 'accidentStream.save()' saves the data to the database
          await accidentStream.save();

          // Broadcast success message to all connected clients
          wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ message: 'Data saved successfully', data }));
            }
          });
        } catch (error) {
          console.error('Error saving data:', error);
          ws.send(JSON.stringify({ error: 'Failed to save data', details: error.message }));
        }
      } else {
        console.warn('Received message without heartRate property:', data);
      }
    });    

    // Handle WebSocket errors and closing
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      // Implement error handling or reconnection logic here (optional)
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      // Implement reconnection logic here (optional)
    };

    return () => ws.close(); // Ensure WebSocket connection is closed on cleanup
  });
}

module.exports = startWebSocketServer;
