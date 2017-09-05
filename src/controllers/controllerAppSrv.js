//dsdoc

var pg = require('pg');

var uri='postgres://qiesztuyzkkrdc:7f4388c1acf33c0f8a94630cc9dec43d619d3d4bcff6a2c301b80b9601ecc7ee@ec2-23-23-244-83.compute-1.amazonaws.com:5432/defee7cf3635gv?ssl=true';

function getUsers(request, response){
  /*Check for autorization
  if (!aut){
    return res.status(500).json({success: false, data: err});
  }
  */
  pg.connect(uri, function(err, client, done) {
    if(err){
      console.log("not able to get connection "+ err);
      response.status(400).send(err);
    }
    client.query('SELECT * FROM drivers', function(err, result) {
      done();
      if (err){
        console.log(err);
        return response.status(401).json({success: false, data: err}); //Unexpected error.
      }
      else{
        results = result.rows;
        return response.status(200).json({success: false, data: results});
      }
    });
  });
}

function postUsers(){}

function postUsersValidate(){}

function deleteUser(userId){}

function getUser(userId){}

function putUser(userId){}

function getUserCars(userId){}

function postUserCars(userId){}

function deleteCar(userId, carId){}

function getCar(userId, carId){}

function putCar(userId, carId){}

function getUserTransactions(userId){}

function postUserTransactions(userId){}

function getUserTrips(userId){}

function getPaymethods(){}

function postTrips(){}

function postTripEstimate(){}

function getTrip(tripId){}

function postServerPing(){}

module.exports.getUsers = getUsers;
