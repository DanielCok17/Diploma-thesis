require('dotenv').config(); 
const express = require('express')
const cors = require('cors');
const routes = require('./routes');
const app = express();

require('./config/db');
// require('./crons');

app.use(cors());
app.use(express.json());
app.set('trust proxy', 1);
app.use('/', routes);

app.listen(process.env.PORT || 8000, () => {
   console.log(`Server listening on port ${process.env.PORT}`);
 });