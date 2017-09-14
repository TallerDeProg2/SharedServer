var controller = require('../controllers/controllerTransactions.js');

var router = require('./router.js');

/**#@+
  * @lends router
  * @borrows router as router
  * @property routes for Transactions.
  */

router.get('/users/:userId/transactions', function(request, response) {
    var userId = request.params.userId;
    controller.getUserTransactions(userId, request, response);
});

router.post('/users/:userId/transactions', function(request, response) {
    var userId = request.params.userId;
    controller.postUserTransactions(userId, request, response);
});

router.get('/paymethods', function(request, response) {
    controller.getPaymethods(request, response);
});

/**#@-*/
