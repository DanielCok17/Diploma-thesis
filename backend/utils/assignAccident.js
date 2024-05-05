const AccidentReport = require('../models/Accident'); // Nastavte správnu cestu k súboru modelu
const User = require('../models/User'); // Make sure the path to the User model is correct
const RescueUnit = require('../models/RescueUnit'); // Upravte podľa potreby cestu k modelu

async function assignAccidentToUser(accidentId){
    const accident = await AccidentReport.findById(accidentId);

    // find user with role policeman and assignedAccident is null
    const user = await User.findOne({ role: 'policeman', assignedAccident: null });

    // if no user found, return
    if (!user) {
        console.log('No available policeman found');
        return;
    }

    // assign accident to user
    user.assignedAccident = accidentId;
    await user.save();

    // find rescue unit with type Police and status Available
    const rescueUnit = await RescueUnit.findOne({ type: 'Police', status: 'Available' });

    // if no rescue unit found, return
    if (!rescueUnit) {
        console.log('No available police unit found');
        return;
    }

    // assign accident to rescue unit
    rescueUnit.accidentId = accidentId;
    rescueUnit.status = 'Busy';
    await rescueUnit.save();

    // accident assignedUsers update
    accident.assignedUsers.push(user._id);
    accident.status = 'assigned';
    await accident.save();

    console.log('Accident assigned to user and rescue unit');

}

// end accident 
async function endAccident(accidentId){
    const accident = await AccidentReport.findById(accidentId);

    // find all users assigned to the accidentId
    const users = await User.find({ assignedAccident: accidentId });

    // find all rescue units assigned to the accidentId
    const rescueUnits = await RescueUnit.find({ accidentId });

    // set status of all users to null
    for (const user of users) {
        user.assignedAccident = null;
        await user.save();
    }

    // set status of all rescue units to Available
    for (const rescueUnit of rescueUnits) {
        rescueUnit.accidentId = null;
        rescueUnit.status = 'Available';
        await rescueUnit.save();
    }

    // set status of accident to resolved
    accident.status = 'resolved';
    await accident.save();

    console.log('Accident resolved');
}

module.exports = {assignAccidentToUser, endAccident};