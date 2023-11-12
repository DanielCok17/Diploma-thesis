const express = require('express');
const helmet = require('helmet');
const router = express.Router();

const testRoutes = require('./test');
const AccidentRoutes = require('./accident');

router.use(helmet());

router.use('/test', testRoutes);
router.use('/accident', AccidentRoutes);

module.exports = router;