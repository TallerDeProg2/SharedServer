const helloWorld = require('../controllers/controllerHelloWorld.js');
const hello = helloWorld.salutation();

var router = require('./router.js');

router.get('/hello', function(request, response) {
  response.send(hello);
});

module.exports = router;
