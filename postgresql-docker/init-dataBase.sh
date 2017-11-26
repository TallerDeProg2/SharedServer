#!/bin/bash
set -e

created_time=$(date +"%Y-%m-%d %H:%M:%S %Z" -d "-3 hours")
time_exp=$(date +"%Y-%m-%d %H:%M:%S %Z" -d "+1 day")

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE TABLE srvusers (id text, _ref text, rol text, token text, tokenexp timestamp, data jsonb);
    INSERT INTO srvusers(id, _ref, rol, token, tokenexp, data) VALUES ('00', 'abcde', 'server', 'servercito-token', '$time_exp',
      '{"createdBy" : "docker", "createdTime" : "$created_time", "name" : "servercito", "lastConnection" : "$created_time" }');
    INSERT INTO srvusers(id, _ref, rol, token, tokenexp, data) VALUES ('01', 'cdefg', 'server', 'servercito2-token', '$time_exp',
      '{"createdBy" : "docker", "createdTime" : "$created_time", "name" : "servercito2", "lastConnection" : "$created_time" }');
    INSERT INTO srvusers(id, _ref, rol, token, tokenexp, data) VALUES ('usercito', 'bcdef', 'user', 'token', '$time_exp',
      '{"username" : "usercito", "password" : "pass", "name" : "user", "surname" : "cito", "roles" : ["admin"]}');

    INSERT INTO srvusers(id, _ref, rol, token, tokenexp, data) VALUES ('000', 'xxxxx', 'server', 'superservercito-token', '$time_exp',
      '{"createdBy" : "docker", "createdTime" : "$created_time", "name" : "superservercito", "lastConnection" : "$created_time" }');
    INSERT INTO srvusers(id, _ref, rol, token, tokenexp, data) VALUES ('superusercito', 'yyyyy', 'user', 'superusercito-token', '$time_exp',
      '{"username" : "superusercito", "password" : "pass", "name" : "superuser", "surname" : "cito", "roles" : ["admin"]}');

    CREATE TABLE users (id text, _ref text, driver text, username text, password text, facebookId text, facebookToken text, firstname text, lastname text, country text, email text, birthdate timestamp, car jsonb, card jsonb, transactions jsonb);
    INSERT INTO users(id, _ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions) VALUES ('02', 'defgh', 'passenger', 'usercitoapp', 'pass', 'usercito@app.com', '1234', 'usercito', 'app', 'applandia', 'usercito@app.com', '$created_time', '{}', '{}', '{"transactions" : []}');
    INSERT INTO users(id, _ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions) VALUES ('03', 'efghi', 'driver', 'drivercito', 'pass', 'driver@cito.com', '1234', 'driver', 'cito', 'applandia', 'driver@cito.com', '$created_time',
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
    }');
    INSERT INTO users(id, _ref, driver, username, password, facebookId, facebookToken, firstname, lastname, country, email, birthdate, car, card, transactions) VALUES ('04', 'fghij', 'driver', 'drivernocar', 'pass', 'driver@nocar.com', '1234', 'driver', 'nocar', 'applandia', 'driver@nocar.com', '$created_time', '{}', '{}', '{"transactions" : []}');

    CREATE TABLE rules(id text, _ref text, commits jsonb, active boolean);
    INSERT INTO rules(id, _ref, commits, active) VALUES ('04', 'fghij',
    '{"commits" : [{"_ref" : "fghij",
                    "message" : "test commit",
                    "blob" : "{\"condition\":function (R) { R.when(this); },\"consequence\":function (R) { this.cost = this.cost + this.distance * 15; R.next(); } }",
                    "timestamp" : "$created_time"}]}', true);
    INSERT INTO rules(id, _ref, commits, active) VALUES ('05', 'fghij',
    '{"commits" : [{"_ref" : "fghij",
                    "message" : "test commit",
                    "blob" : "{\"condition\":function (R) { R.when(this); },\"consequence\":function (R) { this.cost = this.cost + this.time * 5; R.next(); } }",
                    "timestamp" : "$created_time"}]}', true);
    INSERT INTO rules(id, _ref, commits, active) VALUES ('06', 'fghij',
    '{"commits" : [{"_ref" : "fghij",
                    "message" : "test commit",
                    "blob" : "{\"condition\":function (R) { R.when(this); },\"consequence\":function (R) { this.cost = this.cost + this.time * 500; R.next(); } }",
                    "timestamp" : "$created_time"}]}', false);

    CREATE TABLE paymethods (name text, parameters jsonb);
    INSERT INTO paymethods(name, parameters) VALUES ('credit card', '{"card number" : "string", "token" : "string", "exp date" : "date"}');
    INSERT INTO paymethods(name, parameters) VALUES ('debit card', '{"card number" : "string", "token" : "string", "exp date" : "date"}');
EOSQL
