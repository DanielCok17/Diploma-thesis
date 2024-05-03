require('dotenv').config(); 
const express = require('express')
const cors = require('cors');
const routes = require('./routes');
const app = express();
const http = require('http');
const startWebSocketServer = require('./websockets/websocketServer');  // Presná cesta k vášmu websocketServer.js
const server = http.createServer(app);

require('./config/db');
// require('./crons');

app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);
app.use('/', routes);

// Inicializácia WebSocket servera
startWebSocketServer(server);

// app.listen(process.env.PORT || 8000, () => {
//    console.log(`Server listening on port ${process.env.PORT}`);
//  });

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server listening on port ${process.env.PORT || 8000}`);
});

// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   ws.on('message', (message) => {
//     console.log('Received message:', message);

//     let isBinary = Buffer.isBuffer(message);
//     console.log('Is Binary:', isBinary);

//     if (isBinary) {
//         // Assuming binary data is in the form of a stringified JSON
//         try {
//             message = JSON.parse(Buffer.from(message).toString());
//             isBinary = false;  // Now the message is a JavaScript object, not binary
//             console.log('Converted binary to JSON:', message);
//         } catch (err) {
//             console.error('Failed to parse binary data to JSON:', err);
//             return;  // Stop further processing if the conversion fails
//         }
//     }

//     // Convert the message to a string if it's a JSON object
//     if (typeof message === 'object' && !isBinary) {
//         message = JSON.stringify(message);
//     }

//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         // If the original message was binary and successfully converted to JSON, send as text
//         client.send(message, { binary: isBinary });
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });

// server.listen(8000, () => {
//   console.log('Server is running on port 8000');
// });
