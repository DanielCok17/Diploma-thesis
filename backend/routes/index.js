const express = require('express');
const expressOasGenerator = require('express-oas-generator');
const helmet = require('helmet');
const router = express.Router();

const AccidentRoutes = require('./accident');
const contactsRoutes = require('./contacts');
const VehicleStateRoutes = require('./vehicleState');
const pressonalDetailsRoutes = require('./personalDetails');
const testRoutes = require('./test');
const userRoutes = require('./user');
const rescueCenterRoutes = require('./rescueCenter');
const rescueUnitRoutes = require('./rescueUnit');
const closedAccidentRoutes = require('./closedAccident');

expressOasGenerator.init(router, {});

router.use(helmet());

router.use('/accident', AccidentRoutes);
router.use('/emergency-contacts', contactsRoutes);
router.use('/vehicle-state', VehicleStateRoutes);
router.use('/personal-details', pressonalDetailsRoutes);
router.use('/test', testRoutes);
router.use('/user', userRoutes);
router.use('/rescue-center', rescueCenterRoutes);
router.use('/rescue-unit', rescueUnitRoutes);
router.use('/closed-accident', closedAccidentRoutes);

module.exports = router;