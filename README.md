# Diploma-thesis
An intelligent web-based system for a rescue center using traffic accident data


## Repository clone

```shell
git clone https://github.com/DanielCok17/Diploma-thesis.git
```

## Run app localally

```shell
./start-local.sh
```

## Run Docker 

```shell
docker-compose build
docker-compose -f ./backend/docker-compose.yml -f ./backend/docker-compose.dev.yml  up -d --build
docker-compose -f ./frontend/docker-compose.yml -f ./frontend/docker-compose.dev.yml  up -d --build
```