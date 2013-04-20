var format = require('util').format;
var ValidationError = require('./validationerror');

/**
* EnumValidator
* Validates value is in enum array
*/
var EnumValidator = Object.create({});
EnumValidator.validate = function (arr, value, name) {
  if (arr.indexOf(value) < 0) {
    return new ValidationError(format("is not a value in %s", arr), name, value);
  }
}
exports = module.exports = EnumValidator;