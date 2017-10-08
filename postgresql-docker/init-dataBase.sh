#!/bin/bash
set -e

time_exp=$(date +"%Y-%m-%d %H:%M:%S %Z" -d "+1 day")

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE DATABASE docker;
    GRANT ALL PRIVILEGES ON DATABASE docker TO postgres;
    CREATE TABLE srvusers (id text, _ref text, rol text, token text, tokenexp timestamp, data jsonb);
    INSERT INTO srvusers(id, _ref, rol, token, tokenexp, data) VALUES ('1', 'rtfhgf', 'server', 'token', '$time_exp',
      '{"createdBy" : "docker","createdTime" : "$time_exp", "name" : "servercito", "lastConnection" : "$time_exp" }');
    SELECT * FROM srvusers WHERE rol='server';
EOSQL
