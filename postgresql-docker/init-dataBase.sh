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
    INSERT INTO srvusers(id, _ref, rol, token, tokenexp, data) VALUES ('superusercito', 'bcdef', 'user', 'superusercito-token', '$time_exp',
      '{"username" : "superusercito", "password" : "pass", "name" : "superuser", "surname" : "cito", "roles" : ["admin"]}');

    CREATE TABLE users (id text, driver text, username text, password text, facebookId text, facebookToken text, firstName text, lastName text, country text, email text, birthdate timestamp, car jsonb, card jsonb);
    INSERT INTO users(id, driver, username, password, facebookId, facebookToken, firstName, lastName, country, email, birthdate, car, card) VALUES ('02', 'passenger', 'usercitoapp', 'pass', 'usercito@app.com', '1234', 'usercito', 'app', 'applandia', 'usercito@app.com', '$created_time', '{}', '{}');
EOSQL
