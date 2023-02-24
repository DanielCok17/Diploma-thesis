#!/usr/bin/env sh

# cd frontend
# npm install -g pnpm
# rm -rf package-lock.json
# rm -fr node_moduls
# [ ! -d "./node_modules" ] && pnpm i
# pnpm run build
# pnpm start

# cd ../backend
# [ ! -d ./"node_modules" ] && npm i
# sleep 5 && open http://localhost:3001 &
# npm start

docker-compose build

docker-compose -f ./backend/docker-compose.yml -f ./backend/docker-compose.dev.yml  up -d --build

docker-compose -f ./frontend/docker-compose.yml -f ./frontend/docker-compose.dev.yml  up -d --build

sleep 20 && open http://localhost:3001 