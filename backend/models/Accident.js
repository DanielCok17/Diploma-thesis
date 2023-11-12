const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
    type: { type: String, required: true },
    coordinates: { type: String, required: true },
    timestamp: { type: String, required: true }
});

const driverSchema = new mongoose.Schema({
    seatbelt: { type: Boolean, required: true },
    drowsiness: { type: Boolean, required: true },
    heart_rate: { type: Number, required: true }
});

const accidentDataSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    acceleration: { type: Number, required: true },
    speed: { type: Number, required: true },
    license_plates: [{ type: String, required: true }],
    coordinates: { type: String, required: true },
    violations: [violationSchema],
    driver: driverSchema,
    passengers_num: { type: Number, required: true }
});

const AccidentData = mongoose.model('AccidentData', accidentDataSchema);

module.exports = AccidentData;
