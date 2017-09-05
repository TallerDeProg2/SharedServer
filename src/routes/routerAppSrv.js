var controller = require('../controllers/controllerAppSrv.js');

var router = require('./router.js');

router.get('/users', function(request, response) {
    controller.getUsers(request, response);
});

router.post('/users', function(request, response) {
    controller.postUsers();
});

router.post('/users/validate', function(request, response) {
    controller.postUsersValidate();
});

router.delete('/users/{userId}', function(request, response) {
    controller.deleteUser(userId);
});

router.get('/users/{userId}', function(request, response) {
    controller.getUser(userId);
});

router.put('/users/{userId}', function(request, response) {
    controller.putUser(userId);
});

router.get('/users/{userId}/cars', function(request, response) {
    controller.getUserCars(userId);
});

router.post('/users/{userId}/cars', function(request, response) {
    controller.postUserCars(userId);
});

router.delete('/users/{userId}/cars/{carId}', function(request, response) {
    controller.deleteCar(userId, carId);
});

router.get('/users/{userId}/cars/{carId}', function(request, response) {
    controller.getCar(userId, carId);
});

router.put('/users/{userId}/cars/{carId}', function(request, response) {
    controller.putCar(userId, carId);
});

router.get('/users/{userId}/transactions', function(request, response) {
    controller.getUserTransactions(userId);
});

router.post('/users/{userId}/transactions', function(request, response) {
    controller.postUserTransactions(userId);
});

router.get('/users/{userId}/trips', function(request, response) {
    controller.getUserTrips(userId);
});

router.get('/users/paymethods', function(request, response) {
    controller.getPaymethods();
});

router.post('/trips', function(request, response) {
    controller.postTrips();
});

router.post('/trips/estimate', function(request, response) {
    controller.postTripEstimate();
});

router.get('/trips/{tripId}', function(request, response) {
    controller.getTrip(tripId);
});

router.post('/servers/ping', function(request, response) {
    controller.postServerPing();
});
