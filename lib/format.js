var format = require('util').format;
var ValidationError = require('./validationerror');

/**
* Format validator
* Validates values using regular expression
*/
var FormatValidator = Object.create({});
FormatValidator.validate = function (format, value, name) {
  if (!(format.toLowerCase() in formats)) {
    throw new Error('validator for '+format+' does not exist');
  }

  var validator = formats[format.toLowerCase()];
  if (!validator.regex.test(value)) {
    return new ValidationError(validator.message, name, value);
  }
}
exports = module.exports = FormatValidator;

/**
* Format validators
*/
var formats = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "is not a valid email address"
  },
  phone: {
    name: "PhoneNumber",
    regex: /^(\+\d{1,2})?\s*\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    message: "is not a valid phone number"
  },
  sip: {
    name: "SIP",
    regex: /^((sip|sips):([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "is not a valid SIP address"
  },
  url: {
    name: "URL",
    regex: /^(http[s]?:\/\/){1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/,
    message: "is not a valid URL"
  },
  uuid: {
    name: "UUID",
    regex: /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/,
    message: "is not a valid UUID"
  }
};

exports.options = formats;