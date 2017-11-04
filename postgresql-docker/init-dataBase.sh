#!/bin/bash
set -e

time_exp=$(date +"%Y-%m-%d %H:%M:%S %Z" -d "+1 day")

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE TABLE srvusers (id text, _ref text, rol text, token text, tokenexp timestamp, data jsonb);
    INSERT INTO srvusers(id, _ref, rol, token, tokenexp, data) VALUES ('00', 'abcde', 'server', 'servercito-token', '$time_exp',
      '{"createdBy" : "docker", "createdTime" : "$time_exp", "name" : "servercito", "lastConnection" : "$time_exp" }');
    INSERT INTO srvusers(id, _ref, rol, token, tokenexp, data) VALUES ('01', 'bcdef', 'user', 'token', '$time_exp',
      '{"username" : "usercito", "password" : "pass", "name" : "user", "surname" : "cito", "roles" : "admin"}');
EOSQL
