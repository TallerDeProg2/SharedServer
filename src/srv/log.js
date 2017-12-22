/** @module log */

var winston = require('winston');

/**
* Log for the app with three differents streams (info, warn
    and error).
* type {Object}
*/
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'info-file',
      filename: 'info.log',
      json: true,
      colorize: true,
      level: 'info'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'error.log',
      json: true,
      colorize: true,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      level: 'error'
    }),
    new (winston.transports.File)({
      name: 'warn-file',
      filename: 'warn.log',
      json: true,
      colorize: true,
      level: 'warn'
    })
  ],
  exitOnError: false
});

module.exports = logger;

 /**
  * @function Stream for morgan to use for logging http requests.
  * @memberof module:Log
  * @inner
  */
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
