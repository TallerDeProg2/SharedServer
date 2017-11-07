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
EOSQL
