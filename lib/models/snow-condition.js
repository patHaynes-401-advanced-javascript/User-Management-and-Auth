const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  condition: {
    type: String,
    require: true,
  },
  snowfall: {
    type: Number,
    required: true
  }
  
});

module.exports = mongoose.model('SnowCondition', schema,);