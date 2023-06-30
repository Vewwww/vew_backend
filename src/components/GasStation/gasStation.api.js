const express = require('express');
const {
  createGasStation,
  getGasStations,
  getGasStation,
  updateGasStation,
  deleteGasStation,
  getNearestGasStations,
} = require('./gasStation.services');

const { validateLatandLon } = require('./gasStation.validator');
const router = express.Router();

// router.route('/:id').get(getGasStation)

module.exports = router;
