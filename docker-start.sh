docker run -p 6000:5432 --name postgres-dataBase -e POSTGRES_PASSWORD=password -v ${PWD}/postgresql-docker:/docker-entrypoint-initdb.d postgres
