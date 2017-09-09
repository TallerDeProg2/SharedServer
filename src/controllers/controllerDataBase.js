var pg = require('pg');
var uri='postgres://qiesztuyzkkrdc:7f4388c1acf33c0f8a94630cc9dec43d619d3d4bcff6a2c301b80b9601ecc7ee@ec2-23-23-244-83.compute-1.amazonaws.com:5432/defee7cf3635gv?ssl=true';

var logger = require('../srv/log.js');

function query(q, response, parser){
  console.log("entro");
  pg.connect(uri, function(err, client, done) {
    console.log("entro connectcl");
    if(err){
      console.log("there is errorrr");
      logger.error("Not able to get connection " + err);
      return parser({'success': false, 'status': 400, 'data': err}, response);
    }
    client.query(q, function(err, result) {
      console.log("query");
      done();
      if (err){
        console.log("there is errorrr (Unexpected)");
        logger.error("Unexpected error" + err);
        return parser({'success': false, 'status': 401, 'data': err}, response); //Unexpected error.
      }
      else{
        results = result.rows;
        console.log("OK");
        return parser({'success': true, 'status': 200, 'data': results}, response);
      }
    });
  });
}

module.exports.query = query;
