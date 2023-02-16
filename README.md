<h1 align="center">
🌐 MERN Stack
</h1>

<p align="center">
  <img src="https://miro.medium.com/v2/format:webp/0*hU4zJiyVwWcM0L-w.png" width="100%" height="200" />
</p>

<br>

> This app si a MERN fullstack implementation in MongoDB, Expressjs, React/Redux, Nodejs. 

> MERN stack is the idea of using Javascript/Node for fullstack web development.


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
