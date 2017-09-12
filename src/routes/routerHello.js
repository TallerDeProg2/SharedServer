const helloWorld = require('../controllers/controllerHelloWorld.js');
const hello = helloWorld.salutation();

var router = require('./router.js');

/**#@+
  * @lends router
  * @borrows router as router
  * @property example route.
  */

router.get('/hello', function(request, response) {
  response.send(hello);
});

module.exports = router;

/**#@-*/
