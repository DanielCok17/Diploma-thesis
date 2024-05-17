const express = require('express');
const mongoose = require('mongoose');
const RescueCenter = require('../models/RescueCenter'); 
const Accident = require('./models/Accident');

async function assignRescueCenter(accidentId) {
    try {
      // Fetch the accident details
      const accident = await Accident.findById(accidentId);
      if (!accident) throw new Error('Accident not found');
  
      // Find nearby rescue centers based on accident location
      const nearbyCenters = await RescueCenter.find({
        area: {
          $geoWithin: {
            $centerSphere: [[accident.location.lng, accident.location.lat], 10 / 6378.1] // 10 km radius
          }
        }
      }).exec();
  
      if (!nearbyCenters.length) throw new Error('No rescue centers nearby');
  
      // Evaluate the best center (This is simplified, you'd include more logic based on your requirements)
      let bestCenter = nearbyCenters[0]; // Assuming the first one is the best for demonstration
      for (let center of nearbyCenters) {
        if (center.specialization === accident.type && center.resources > bestCenter.resources) {
          bestCenter = center;
        }
      }
  
      // Assume function to alert the selected rescue center
      alertRescueCenter(bestCenter, accident);
  
      return bestCenter;
    } catch (error) {
      console.error('Failed to assign rescue center:', error);
      throw error;
    }
  }
  
  function alertRescueCenter(center, accident) {
    console.log(`Alerting ${center.name} about accident at ${accident.location.lat}, ${accident.location.lng}`);
    // Additional logic to send notifications to the rescue center
  }

  
module.exports = {assignRescueCenter};