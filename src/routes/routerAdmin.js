var controller = require('../controllers/controllerAdmin.js');

var router = require('./router.js');

router.get('/business-users', function(request, response) {
    controller.getBusinessUsers();
});

router.post('/business-users', function(request, response) {
    controller.postBusinessUsers();
});

router.delete('/business-users/{userId}', function(request, response) {
    controller.deleteBusinessUser(userId);
});

router.put('/business-users/{userId}', function(request, response) {
    controller.putBusinessUser(userId);
});

router.post('/rules/run', function(request, response) {
    controller.runRules();
});

router.post('/rules/{ruleId}/run', function(request, response) {
    controller.runRule(ruleId);
});
