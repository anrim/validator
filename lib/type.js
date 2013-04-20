var format = require('util').format;
var ValidationError = require('./validationerror');

/**
* TypeValidator
* 
* Validate value is of a type
*/
var TypeValidator = Object.create({});
TypeValidator.validate = function (type, value, name) {
  if (typeof type !== "string") {
    throw new TypeError('type to validate is required');
  }
  
  var valid = false; 
  switch(type) {
    case "array":
      if(typeof value === "object" && Array.isArray(value)) {
        valid = true;
      }
      break;
    case "bool":
    case "boolean":
      if (typeof value === "boolean") {
        valid = true;
      }
      break;
    case "date":
      if (typeof value === "object" && value.getTime && typeof value.getTime === "function") {
        valid = true;
      }
      break;
    case "object":
      if (typeof value === "object") {
        valid = true;
      }
      break;
    case "number":
      if (typeof value === "number") {
        valid = true;
      }
      break
    case "string":
      if (typeof value === "string") {
        valid = true;
      }
      break;
    default:
      break;
  }
  
  if (!valid) {
    return new ValidationError(format(exports.message, type), name, value);
  }
}

exports = module.exports = TypeValidator;
exports.message = "is not a valid %s";
exports.options = ["array", "boolean", "date", "object", "number", "string"];