const mongoose = require('monogoose');
const { Schema } = mongoose;

const snowConditionSchema = new Schema({
  condition: {
    type: String,
    require: true,
  }
});

module.exports = mongoose.model('SnowCondition', snowConditionSchema, 'snowCondition');