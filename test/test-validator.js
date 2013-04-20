var assert = require('assert');
var Validator = require('..');
var ValidationError = require('../lib/validationerror');

var validator = Validator();
var validate = validator.validate.bind(validator);
var check = Validator.check;

describe('check', function () {
  describe('Email', function () {
    it('should be valid email', function () {
      assert.equal(check("me@gmail.com").isEmail(), true);
    });

    it('should not be a valid email', function () {
      assert.equal(check("megmail.com").isEmail(), false);
    });
  });
  
  describe('SIP', function () {
    it('should be valid sip', function () {
      assert.equal(check("sip:me@sip.com").isSIP(), true);
      assert.equal(check("sips:medsdsdsds@sip.com").isSIP(), true);
    });

    it('should not be a valid sip', function () {
      assert.equal(check("mesip.com").isSIP(), false);
    });
  });
  
  describe('Phone', function () {
    it('should be a valid international phone number', function () {
      assert.equal(check("+1 123 456 7890").isPhoneNumber(), true);
    });
    
    it('should be a valid phone number', function () {
      assert.equal(check("(123) 456-7890").isPhoneNumber(), true);
    });

    it('should not be a valid phone number', function () {
      assert.equal(check("1234").isPhoneNumber(), false);
    });
  });
  
  describe('URL', function () {
    it('should be a valid URL', function () {
      assert.equal(check("http://google.com").isURL(), true);
      assert.equal(check("http://www.google.com").isURL(), true);
      assert.equal(check("https://google.com/search?q=keyword1+keyword2").isURL(), true);
    });
    
    it('should not be a valid URL', function () {
      assert.equal(check("google.com").isURL(), false);
      assert.equal(check("http:/www.google.com").isURL(), false);
      assert.equal(check("https:///google.com/search?q=keyword1+keyword2").isURL(), false);
    });
  })
});

describe('validate', function () {
  describe('required', function () {
    it('should be valid with required property', function () {
      assert.equal(validate({name: "Some name"}, {
        properties: {
          name: {required: true}
        }
      }), null);
    });
    
    it('should not be valid without required property', function () {
      assert.equal(validate({}, {
        properties: {
          name: {required: true}
        }
      }).length, 1);
    });
    
    it('should ignore other validators if required is not valid', function () {
      assert.equal(validate({}, {
        properties: {
          name: {required: true, format: "email"}
        }
      }).length, 1);
    });
    
    it('should not validate optional property', function () {
      assert.equal(validate({}, {
        properties: {
          isActive: {type: "boolean"}
        }
      }), null);
    });
  });
  
  describe('enum', function () {
    it('value should be in enum', function () {
      assert.equal(validate({type: "one"}, {
        properties: {
          type: {enum: ["one", "two"]}
        }
      }), null);
    });
  });
  
  describe.skip('items', function(){
    it('should validate items against allowed items (schema or [schema])', function(){
      
    })
  })

  describe('type', function () {
    it('should be valid with correct type', function () {
      assert.equal(validate({name: "Name"}, {
        properties: {
          name: {type: "string"}
        }
      }), null);
    });

    it("should not be valid with wrong type", function () {
      assert.equal(validate({name: 1}, {
        properties: {
          name: {type: "string"}
        }
      }).length, 1);
    });
  });
});