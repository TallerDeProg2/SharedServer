var crypto = require('crypto');
var moment = require('moment');

function createRef(id){
  var date = moment().format('YYYY-MM-DD HH:mm:ss Z');
  return crypto.createHash('md5').update(date+id).digest('hex');
}

module.exports.createRef = createRef;
