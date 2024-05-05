const AccidentReport = require('../models/Accident'); // Nastavte správnu cestu k súboru modelu
const VehicleState = require('../models/VehicleState'); // Make sure the path to the VehicleState model is correct

async function assessAndDispatch(accidentId) {
    console.log('Assessing accident severity and dispatching emergency units...');
    // Sample data
    const accident = await AccidentReport.findById(accidentId);
    const vehicleState = await VehicleState.findOne({ vin: accident.vin });

    const {
        speed,
        acceleration,
        passengers_num,
        violations,
        coordinates,
        driver
    } = accident;
    const {
        steering_wheel_angle,
        brake_pedal,
        acceleration_pedal
    } = vehicleState.states[0]; // Assuming the most recent state is passed

    let severityPoints = 0;

    // Speed and acceleration checks
    if (speed > 80) severityPoints += 2;
    if (acceleration > 5) severityPoints += 2;

    // Passenger and violation checks
    if (passengers_num > 3) severityPoints += 1;
    if (violations.length > 1) severityPoints += 2;

    // Vehicle state checks
    if (Math.abs(steering_wheel_angle) > 10) severityPoints += 2;
    if (!brake_pedal && speed > 30) severityPoints += 2; // Not braking at high speed
    if (acceleration_pedal > 50) severityPoints += 1;

    // Driver condition checks
    if (!driver.seatbelt) severityPoints += 1;
    if (driver.drowsiness) severityPoints += 2;

    // Determine severity based on points
    let severity = 'minor';
    const emergencyUnits = {
        police: 0,
        firefighters: 0,
        rescuers: 1 // Always send at least one rescuer unit
    };

    if (severityPoints >= 5) {
        severity = 'major';
        emergencyUnits.police = 2;
        emergencyUnits.firefighters = 2;
        emergencyUnits.rescuers = 2;
    } else if (severityPoints >= 3) {
        severity = 'moderate';
        emergencyUnits.police = 1;
        emergencyUnits.firefighters = 1;
    }

    console.log(`Accident severity assessed as: ${severity}`);
    console.log(`Units required: Police: ${emergencyUnits.police}, Firefighters: ${emergencyUnits.firefighters}, Rescuers: ${emergencyUnits.rescuers}`);

    // Optionally dispatch units
    // EmergencyDispatchService.sendPolice(location);
    // EmergencyDispatchService.sendFirefighters(location);
    // EmergencyDispatchService.sendRescuers(location);

    return {
        severity,
        emergencyUnits
    }
}

module.exports = { assessAndDispatch };
