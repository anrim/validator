var assert = require('assert');
var ValidationError = require('../lib/validationerror');

describe('ValidationError', function () {
  it('should be an instance of ValidationError', function () {
    var err = new ValidationError("not a valid email", "email", "megmail.com");
    assert.ok(err instanceof ValidationError)
    assert.equal(err.name, "ValidationError");
  })
  
  it('should not have value', function () {
    var err = new ValidationError("not a valid email", "email");
    assert.equal(err.value, null);
  })
  
  it('should have properties: message, property & name', function () {
    var err = new ValidationError("not a valid email", "email", "megmail.com");
    assert.ok(err.hasOwnProperty('name'));
    assert.equal(err.name, "ValidationError");
    assert.equal(err.message, "not a valid email");
    assert.equal(err.property, "email");
    assert.equal(err.value, "megmail.com");
  })
  
  it('should have toString', function () {
    var err = new ValidationError("is not a valid email address", "email", "megmail.com");
    assert.equal(err.toString(), "email=megmail.com is not a valid email address");
  })
})