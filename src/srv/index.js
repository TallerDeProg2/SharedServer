const helloWorld = require('./helloWorld.js')
const hello = helloWorld.salutation()

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.send(hello)
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
