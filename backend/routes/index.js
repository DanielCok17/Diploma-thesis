const express = require('express');
const expressOasGenerator = require('express-oas-generator');
const helmet = require('helmet');
const router = express.Router();

const AccidentRoutes = require('./accident');
const contactsRoutes = require('./contacts');
const VehicleStateRoutes = require('./vehicleState');
const pressonalDetailsRoutes = require('./personalDetails');

expressOasGenerator.init(router, {});

router.use(helmet());

router.use('/accident', AccidentRoutes);
router.use('/emergency-contacts', contactsRoutes);
router.use('/vehicle-state', VehicleStateRoutes);
router.use('/personal-details', pressonalDetailsRoutes);

module.exports = router;