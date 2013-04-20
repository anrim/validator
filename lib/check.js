var Validator = require('..');
/**
* Checker
*
* Check value
* 
* @example
* check("name").isString().notEmpty();
*/
var Check = Object.create({});

// formats
var formats = Validator["format"].options;
Object.keys(formats).forEach(function (formatName) {
  var format = formats[formatName];
  Check['is'+(format.name || capitalize(formatName))] = function () {
    return this.validator.get("format").validate(formatName, this.value) == null;
  };
});

var types = Validator["type"].options;
types.forEach(function (type) {
  Check['is'+capitalize(type)] = function () {
    return this.validator.get("type").validate(type, this.value) == null;
  }
});

/**
* Check
* 
* @param {any} value Value to check
* @return {Boolean} True or False
*/
function check (value) {
  var validator = Validator();
  var checker = Object.create(Check, {
    value: {enumerable: true, value: value},
    validator: {enumerable: true, value: validator}
  });
  return checker;
}

module.exports = check;

// Helpers
function capitalize (s) {
  s = s.trim();
  return s[0].toUpperCase() + s.slice(1);
}