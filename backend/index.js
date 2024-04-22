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