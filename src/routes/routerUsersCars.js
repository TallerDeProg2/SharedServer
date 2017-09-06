var controller = require('../controllers/controllerUsersCars.js');

var router = require('./router.js');

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
