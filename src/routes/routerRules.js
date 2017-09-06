var controller = require('../controllers/controllerRules.js');

var router = require('./router.js');

router.post('/rules/run', function(request, response) {
    controller.runRules();
});

router.post('/rules/{ruleId}/run', function(request, response) {
    controller.runRule(ruleId);
});

router.post('/rules', function(request, response) {
    controller.postRule();
});

router.delete('/rules/{ruleId}', function(request, response) {
    controller.deleteRule(ruleId);
});

router.put('/rules/{ruleId}', function(request, response) {
    controller.putRule(ruleId);
});

router.get('/rules/{ruleId}/commits', function(request, response) {
    controller.getRuleCommits(ruleId);
});

router.get('/rules/{ruleId}/commits/{commitId}', function(request, response) {
    controller.getRuleCommit(ruleId, commitId);
});
