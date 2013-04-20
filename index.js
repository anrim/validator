var Validator = require('./lib/validator');

exports = module.exports = function (options) {
  var validator = Object.create(Validator, {
    validators: {enumerable: true, value: []}
  });
  
  // Load validators
  validators.forEach(function(name){
    validator.add(name, exports[name]);
  });
  return validator;
};

// Load validators
var validators = exports.validators = require('./lib/validators');
validators.forEach(function(name){
  exports[name] = require('./lib/'+name);
});

exports.check = require('./lib/check');
exports.ValidationError = require('./lib/validationerror');

