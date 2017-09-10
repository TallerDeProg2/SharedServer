var controller = require('../controllers/controllerUsersCars.js');

var router = require('./router.js');

router.get('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    controller.getUserCars(userId, request, response);
});

router.post('/users/:userId/cars', function(request, response) {
    var userId = request.params.userId;
    controller.postUserCars(userId, request, response);
});

router.delete('/users/:userId/cars/:carId', function(request, response) {
    var userId = request.params.userId;
    var carId = request.params.carId;
    controller.deleteCar(userId, carId, request, response);
});

router.get('/users/:userId/cars/:carId', function(request, response) {
    var userId = request.params.userId;
    var carId = request.params.carId;
    controller.getCar(userId, carId, request, response);
});

router.put('/users/:userId/cars/:carId', function(request, response) {
    var userId = request.params.userId;
    var carId = request.params.carId;
    controller.putCar(userId, carId, request, response);
});
