
# Validator

JSON schema validator for node.js and the browser.

## Installation

Node.js

	$ npm install anrim-validator

Component

	$ component install anrim/validator

## Features

* Validate obj with JSON schema
* Check value with chaining
* Works client & server-side

## API

**validate(obj, schema, options)**

**check(value)**

### Validators

#### General

* default - default value or function
* required - value can't be empty
* type - array, boolean, string, number, date or object

#### Array
* enum - value must be in array
* items - schema(s) of values in the array

…

TBA


## To do

* Add lots of more validators
* Pass tests for JSON schema draft 4

## License

  MIT
