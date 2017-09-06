var controller = require('../controllers/controllerTransactions.js');

var router = require('./router.js');

router.get('/users/{userId}/transactions', function(request, response) {
    controller.getUserTransactions(userId);
});

router.post('/users/{userId}/transactions', function(request, response) {
    controller.postUserTransactions(userId);
});

router.get('/paymethods', function(request, response) {
    controller.getPaymethods();
});
