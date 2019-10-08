const RequiredString = {
  type: String,
  required: true
};

const OptionalString = {
  type: String,
  required: false
};

const RequiredDate = {
  type: Date,
  required: true
};

const OptionalDate = {
  type: Date,
  required: false
};

const RequiredNumber = {
  type: Number,
  required: true
};

const RequiredRating = {
  type: Number,
  required: true,
  min: 1,
  max: 5
};

const RequiredDescription = {
  type: String,
  required: true,
  maxlength: 140,
};

module.exports = {
  RequiredString,
  OptionalString,
  RequiredDate,
  OptionalDate,
  RequiredNumber,
  RequiredRating,
  RequiredDescription
};