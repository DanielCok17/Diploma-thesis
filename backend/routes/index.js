const express = require('express');
const helmet = require('helmet');
const router = express.Router();

const testRoutes = require('./test');
const AccidentRoutes = require('./accident');
const contactsRoutes = require('./contacts');
const VehicleStateRoutes = require('./vehicleState');
const pressonalDetailsRoutes = require('./personalDetails');

router.use(helmet());

router.use('/test', testRoutes);
router.use('/accident', AccidentRoutes);
router.use('/emergency-contacts', contactsRoutes);
router.use('/vehicle-state', VehicleStateRoutes);
router.use('/personal-details', pressonalDetailsRoutes);

module.exports = router;