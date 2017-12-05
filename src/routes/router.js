var express = require('express');

/**
  *  Definess a Router for the APIRest.
  * @class
  * @constructor
  */
var router = express.Router();

router.get('/index', function(req, res) {
	res.sendFile('index.html', { root: './src/webapp/' });
});

module.exports = router;
