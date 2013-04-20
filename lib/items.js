var format = require('util').format;
var validateType = require('./type');
var ValidationError = require('./validationerror');
var validator = require('..')();

exports.validate = function (schemas, items, name) {
  var errors = [];
  
  // items must be a schema or an array of schemas
  if (!Array.isArray(schemas)) {
    schemas = [schemas];
  }
  
  // TODO validate agsinst multiple schema
  var schema = schemas[0];
  debugger
  // each item of value must be of type in items
  items.forEach(function (item) {
    var err = validator.validate(item, schema);
    if (err) {
      errors.concat(err);
    }
  });
  
  if (errors.length > 0) {
    return errors;
  }
}

exports.message = "%s not a valid %s";