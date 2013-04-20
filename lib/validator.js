/**
* Validate obj with JSON schema
*/
var Validator = Object.create({});

Validator.add = function (name, validator) {
  if (name && validator) {
    this.validators[name] = validator;
  }
}

Validator.get = function (name) {
  if (name && name in this.validators) {
    return this.validators[name];
  } else if (["value"].indexOf(name) > -1) {
    // not a validator, ignore
  } else {
    throw new Error('validator(): validator with name "'+name+'" does not exist');
  }
}

Validator.remove = function (name) {
  if (name && name in this.validators) {
    delete this.validators[name];
  }
}

Validator.validate = function (obj, schema, options) {
  if (!(typeof obj === "object")) {
    throw new TypeError("obj to validate is required");
  }
  
  if (!(typeof schema === "object")) {
    throw new TypeError("schema is required");
  }
  
  options = options || {additionalProperties: false};
  
  var errors = [];
  Object.keys(schema.properties).forEach(function (propertyName) {
    var actualValue = obj[propertyName];
    var propertyValidators = schema.properties[propertyName];
    var propertyValidatorNames = Object.keys(propertyValidators);
    
    // First check 'required'
    var requiredIsValid;
    if ('required' in propertyValidators) {
      requiredIsValid = false;
      
      var i = propertyValidatorNames.indexOf("required");
      if (i > -1) {
        // remove from validator names list
        propertyValidatorNames.splice(i, 1);
      }
      
      // validate required
      if (propertyValidators.required === true) {
        var err = this.validateValue("required", propertyValidators.required, actualValue, propertyName);
        if (err) {
          errors.push(err);
        } else {
          requiredIsValid = true;
        }
      }
    }
    
    // Validate value with each property validator
    propertyValidatorNames.forEach(function (validatorName) {
      // Only validate other property validators if required is valid
      if ((typeof requiredIsValid === "undefined" && typeof actualValue !== "undefined") || requiredIsValid === true) {
        
        // items validation
        if (validatorName == "items") {
          // items must be a schema or an array of schemas
          var schemas = propertyValidators[validatorName];
          if (!Array.isArray(schemas)) {
            schemas = [schemas];
          }
          // TODO validate agsinst multiple schema
          var schema = schemas[0];
          
          var arr = actualValue;
          arr.forEach(function (obj) {
            var err = this.validate(obj, schema);
            if (err) {
              errors.concat(err);
            }
          }, this);
        } else {
          var expectedValue = propertyValidators[validatorName];
          var err = this.validateValue(validatorName, expectedValue, actualValue, propertyName);
          if (err) {
            errors.push(err);
          }
        }
      }
    }, this);
  }, this);
  
  return (errors.length > 0)?errors:null;
}

/**
* Validate value with validator
* 
* @param {String} validatorName The nam of the validator e.g format, required, type etc
*/
Validator.validateValue = function (validatorName, expectedValue, actualValue, propertyName) {
  var validator = this.get(validatorName);
  if (validator) {
    return validator.validate(expectedValue, actualValue, propertyName);
  }
}

exports = module.exports = Validator;