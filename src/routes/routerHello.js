const helloWorld = require('../controllers/controllerHelloWorld.js');
const hello = helloWorld.salutation();

/**
 * Express router, test endpoints
 * type {Object}
 */
var router = require('./router.js');

/**
 * @name GET/hello
 * @function
 * @memberof module:routerHello
 * @inner
 */
router.get('/hello', function(request, response) {
  response.send(hello);
});

module.exports = router;
