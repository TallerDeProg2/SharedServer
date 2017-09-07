var winston = require('winston');

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
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
