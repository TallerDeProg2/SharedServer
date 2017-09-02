var assert = require('assert');
var helloWorld = require('../src/controllers/controllerHelloWorld.js');

describe('helloWorld', function() {
 it('returns the message "Hello world!"', function() {
   assert.equal(helloWorld.salutation(), "Hello world!");
 });
});
