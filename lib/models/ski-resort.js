const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
  name: RequiredString,
  location: RequiredString,
  elevation: RequiredNumber,
  lifts: {
    type: Number,
    required: true,
    default: 10,
    min: 1,
    max: 25
  },

});

module.exports = mongoose.model('SkiResort', schema);