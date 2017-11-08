var basicParser = require('./controllerParser.js');
var logger = require('../../srv/log.js');

function rdata(data){
  return {'brand': data.car.brand,
    'model': data.car.model,
    'color': data.car.color,
    'plate': data.car.plate,
    'year': data.car.year,
    'status': data.car.status,
    'radio': data.car.radio,
    'airconditioner': data.car.airconditioner
  };
}

function parserGetUserCar(r, response){
  var data = r.data_retrieved[0];
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  if (r.success){
    data = rdata(data);
  }
  return basicParser.extendedParser(r, response, "car", data, 200);
}

function parserPostUserCar(r, response){
  var data = r.data_retrieved[0];
  if (!r.data_retrieved.length){
    r.status = 404;
    r.success = false;
  }
  if (r.success){
    data = rdata(data);
  }
  return basicParser.extendedParser(r, response, "car", data, 201);
}

function parserDeleteUserCar(r, response){
  if ((r.success) && (!r.data_retrieved.length)){
    r.status = 404;
    r.success = false;
  }
  if (!r.success){
    return basicParser.reducedParser(r, response);
  }
  return response.sendStatus(204);
}

function parserPutUserCar(r, response){
  return parserGetUserCar(r, response);
}

module.exports = {
    parserGetUserCar : parserGetUserCar,
    parserPostUserCar : parserPostUserCar,
    parserDeleteUserCar : parserDeleteUserCar,
    parserPutUserCar : parserPutUserCar
};
