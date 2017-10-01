var controller = require('../controllers/controllerRoutes/controllerRules.js');

var router = require('./router.js');

/**#@+
  * @lends router
  * @borrows router as router
  * @property routes for Rules.
  */

router.post('/rules/run', function(request, response) {
    controller.runRules(request, response);
});

router.post('/rules/:ruleId/run', function(request, response) {
    var ruleId = request.params.ruleId;
    controller.runRule(ruleId, request, response);
});

router.post('/rules', function(request, response) {
    controller.postRule(request, response);
});

router.delete('/rules/:ruleId', function(request, response) {
    var ruleId = request.params.ruleId;
    controller.deleteRule(ruleId, request, response);
});

router.put('/rules/:ruleId', function(request, response) {
    var ruleId = request.params.ruleId;
    controller.putRule(ruleId, request, response);
});

router.get('/rules/:ruleId/commits', function(request, response) {
    var ruleId = request.params.ruleId;
    controller.getRuleCommits(ruleId, request, response);
});

router.get('/rules/:ruleId/commits/:commitId', function(request, response) {
    var ruleId = request.params.ruleId;
    var commitId = request.params.commitId;
    controller.getRuleCommit(ruleId, commitId, request, response);
});

/**#@-*/
