var controller = require('../controllers/controllerTrips.js');

var router = require('./router.js');

router.get('/users/{userId}/trips', function(request, response) {
    controller.getUserTrips(userId);
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
