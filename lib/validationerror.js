var format = require('util').format;

function ValidationError (message, property, value) {
  this.name = "ValidationError";
  this.message = message || "is not valid";
  this.property = property;
  this.value = value;
}

ValidationError.prototype = Object.create(Error.prototype, {
  constructor: {value: ValidationError}
});

ValidationError.prototype.toString = function () {
  return format("%s=%s %s", this.property, this.value, this.message);
}

module.exports = ValidationError;
