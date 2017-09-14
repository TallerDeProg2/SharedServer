var pg = require('pg');
var uri_def='postgres://qiesztuyzkkrdc:7f4388c1acf33c0f8a94630cc9dec43d619d3d4bcff6a2c301b80b9601ecc7ee@ec2-23-23-244-83.compute-1.amazonaws.com:5432/defee7cf3635gv?ssl=true';

var logger = require('../srv/log.js');

function query(q, response, parser, status_ok, done=null, uri=uri_def){
  logger.info("Query, message: "+ q);
  pg.connect(uri, function(err, client) {
    if(err){
      logger.error("Not able to get connection " + err);
      return parser({'success': false, 'status': 500, 'data': err}, response, done);
    }
    client.query(q, function(err, result) {
      if (err){
        logger.error("Unexpected error" + err);
        return parser({'success': false, 'status': 500, 'data': err}, response, done); //Unexpected error.
      }
      else{
        results = result.rows;
        logger.info("Query, retrieved: "+ results);
        return parser({'success': true, 'status': status_ok, 'data': results}, response, done);
      }
    });
  });
}

module.exports.query = query;
