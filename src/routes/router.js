var express = require('express');

/**
  *  Definess a Router for the APIRest.
  * @class
  * @constructor
  */
var router = express.Router();

router.get('*', function(req, res) {
	res.sendfile('../webapp/index.html');
});

module.exports = router;
