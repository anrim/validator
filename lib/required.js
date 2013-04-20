var ValidationError = require('./validationerror');

exports.validate = function (required, value, name) {
  if (required && typeof value === "undefined") {
    return new ValidationError("is required", name, value);
  }
} 