/** @module routerTransactions */

var controller = require('../controllers/controllerRoutes/controllerTransactions.js');

/**
 * Express router, Transactions endpoints.
 * type {Object}
 */
var router = require('./router.js');

/**
 * @name GET/users/:userId/transactions
 * @function
 * @memberof module:routerTransactions
 * @inner
 */
router.get('/users/:userId/transactions', function(request, response) {
    var userId = request.params.userId;
    controller.getUserTransactions(userId, request, response);
});

/**
 * @name POST/users/:userId/transactions
 * @function
 * @memberof module:routerTransactions
 * @inner
 */
router.post('/users/:userId/transactions', function(request, response) {
    var userId = request.params.userId;
    controller.postUserTransactions(userId, request, response);
});

/**
 * @name GET/paymethods
 * @function
 * @memberof module:routerTransactions
 * @inner
 */
router.get('/paymethods', function(request, response) {
    controller.getPaymethods(request, response);
});
