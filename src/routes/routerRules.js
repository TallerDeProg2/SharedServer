/** @module routerRules */
var controller = require('../controllers/controllerRoutes/controllerRules.js');

var logger = require('../srv/log.js');

/**
 * Express router, rules endpoints.
 * type {Object}
 */
var router = require('./router.js');


/**
 * @name POST/rules/run
 * @function
 * @memberof module:routerRules
 * @inner
 */
router.post('/rules/run', function(request, response) {
    controller.runRules(request, response);
});

/**
 * @name POST/rules/run
 * @function
 * @memberof module:routerRules
 * @inner
 */
router.post('/rules/:ruleId/run', function(request, response) {
    var ruleId = request.params.ruleId;
    controller.runRule(ruleId, request, response);
});

/**
 * @name POST/rules
 * @function
 * @memberof module:routerRules
 * @inner
 */
router.post('/rules', function(request, response) {
    controller.postRule(request, response);
});

/**
 * @name DELETE/rules/:ruleId
 * @function
 * @memberof module:routerRules
 * @inner
 */
router.delete('/rules/:ruleId', function(request, response) {
    var ruleId = request.params.ruleId;
    controller.deleteRule(ruleId, request, response);
});

/**
 * @name PUT/rules/:ruleId
 * @function
 * @memberof module:routerRules
 * @inner
 */
router.put('/rules/:ruleId', function(request, response) {
    var ruleId = request.params.ruleId;
    controller.putRule(ruleId, request, response);
});

/**
 * @name GET/rules
 * @function
 * @memberof module:routerRules
 * @inner
 */
router.get('/rules', function(request, response) {
    controller.getRules(request, response);
});

/**
 * @name GET/rules/:ruleId
 * @function
 * @memberof module:routerRules
 * @inner
 */
router.get('/rules/:ruleId', function(request, response) {
  var ruleId = request.params.ruleId;
  controller.getRule(ruleId, request, response);
});

/**
 * @name GET/rules/:ruleId/commits
 * @function
 * @memberof module:routerRules
 * @inner
 */
router.get('/rules/:ruleId/commits', function(request, response) {
    var ruleId = request.params.ruleId;
    controller.getRuleCommits(ruleId, request, response);
});

/**
 * @name GET/rules/:ruleId/commits/:commitId
 * @function
 * @memberof module:routerRules
 * @inner
 */
router.get('/rules/:ruleId/commits/:commitId', function(request, response) {
    var ruleId = request.params.ruleId;
    var commitId = request.params.commitId;
    controller.getRuleCommit(ruleId, commitId, request, response);
});
