var express = require('express');

const helloWorld = require('../controllers/controllerHelloWorld.js')
const hello = helloWorld.salutation()

var router = express.Router();

router.get('/hello', function(request, response) {
  response.send(hello)
});

module.exports = router;
