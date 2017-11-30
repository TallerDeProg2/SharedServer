#!/bin/bash
set -e

created_time=$(date +"%Y-%m-%d %H:%M:%S %Z" -d "-3 hours")
time_exp=$(date +"%Y-%m-%d %H:%M:%S %Z" -d "+1 day")

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE TABLE srvusers (id serial primary key, _ref text, rol text, token text, tokenexp timestamp, data jsonb);
    INSERT INTO srvusers(_ref, rol, token, tokenexp, data) VALUES ('abcde', 'server', 'servercito-token', '$time_exp',
      '{"createdBy" : "docker", "createdTime" : "$created_time", "name" : "servercito", "lastConnection" : "$created_time" }');
    INSERT INTO srvusers(_ref, rol, token, tokenexp, data) VALUES ('cdefg', 'server', 'servercito2-token', '$time_exp',
      '{"createdBy" : "docker", "createdTime" : "$created_time", "name" : "servercito2", "lastConnection" : "$created_time" }');
    INSERT INTO srvusers(_ref, rol, token, tokenexp, data) VALUES ('bcdef', 'user', 'token', '$time_exp',
      '{"username" : "usercito", "password" : "pass", "name" : "user", "surname" : "cito", "roles" : ["admin"]}');

    INSERT INTO srvusers(_ref, rol, token, tokenexp, data) VALUES ('xxxxx', 'server', 'superservercito-token', '$time_exp',
      '{"createdBy" : "docker", "createdTime" : "$created_time", "name" : "superservercito", "lastConnection" : "$created_time" }');
    INSERT INTO srvusers(_ref, rol, token, tokenexp, data) VALUES ('yyyyy', 'user', 'superusercito-token', '$time_exp',
      '{"username" : "superusercito", "password" : "pass", "name" : "superuser", "surname" : "cito", "roles" : ["admin"]}');

    CREATE TABLE users (id serial primary key, _ref text, driver text, username text, password text, facebookId text, facebookToken text, firstname text, lastname text, country text, email text, birthdate timestamp, car jsonb, card jsonb, transactions jsonb, balance integer);
    INSERT INTO users(_ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions, balance) VALUES ('defgh', 'passenger', 'usercitoapp', 'pass', 'usercito@app.com', '1234', 'usercito', 'app', 'applandia', 'usercito@app.com', '$created_time', '{}', '{}', '{"transactions" : []}', 0);
    INSERT INTO users(_ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions, balance) VALUES ('efghi', 'driver', 'drivercito', 'pass', 'driver@cito.com', '1234', 'driver', 'cito', 'applandia', 'driver@cito.com', '$created_time',
    '{"brand": "brand",
      "model": "model",
      "color": "color",
      "plate": "plate",
      "year": "year",
      "status": "status",
      "radio": "radio",
      "airconditioner": true,
      "_ref": "abcde"}', '{}',
      '{"transactions" : [{"id": "001",
                        "trip": "tripId",
                        "timestamp": "$created_time",
                        "cost": 20,
                        "description": "string"}]
    }', 0);
    INSERT INTO users(_ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions, balance) VALUES ('fghij', 'driver', 'drivernocar', 'pass', 'driver@nocar.com', '1234', 'driver', 'nocar', 'applandia', 'driver@nocar.com', '$created_time', '{}', '{}', '{"transactions" : []}', 0);

    CREATE TABLE trips(id serial primary key, driver text, passenger text, start jsonb, stop jsonb, totaltime integer, distance integer, cost integer);
    INSERT INTO trips(driver, passenger, start, stop, totaltime, distance, cost) VALUES ('03', '02',
    '{"address": {
        "street": "string",
        "location": {
          "lat": 0,
          "lon": 0
        }}}',
        '{"address": {
            "street": "string",
            "location": {
              "lat": 30,
              "lon": 30
            }}}', 30, 4, 150);
    INSERT INTO trips(driver, passenger, start, stop, totaltime, distance, cost) VALUES ('04', '02',
    '{"address": {
        "street": "string",
        "location": {
          "lat": 10,
          "lon": 0
        }}}',
        '{"address": {
            "street": "string",
            "location": {
              "lat": 40,
              "lon": 40
            }}}', 35, 5, 180);

    CREATE TABLE rules(id serial primary key, _ref text, commits jsonb, active boolean);
    INSERT INTO rules(_ref, commits, active) VALUES ('fghij',
    '{"commits" : [{"_ref" : "fghij",
                    "message" : "test commit",
                    "blob" : "{\"condition\":function (R) { R.when(this); },\"consequence\":function (R) { this.cost = this.cost + this.distance * 15; R.next(); } }",
                    "timestamp" : "$created_time"}]}', true);
    INSERT INTO rules(_ref, commits, active) VALUES ('fghij',
    '{"commits" : [{"_ref" : "fghij",
                    "message" : "test commit",
                    "blob" : "{\"condition\":function (R) { R.when(this); },\"consequence\":function (R) { this.cost = this.cost + this.time * 5; R.next(); } }",
                    "timestamp" : "$created_time"}]}', true);
    INSERT INTO rules(_ref, commits, active) VALUES ('fghij',
    '{"commits" : [{"_ref" : "fghij",
                    "message" : "test commit",
                    "blob" : "{\"condition\":function (R) { R.when(this); },\"consequence\":function (R) { this.cost = this.cost + this.time * 500; R.next(); } }",
                    "timestamp" : "$created_time"}]}', false);
EOSQL
