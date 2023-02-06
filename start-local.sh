#!/usr/bin/env sh

cd frontend
[ ! -d "./node_modules" ] && npm i
npm run build

cd ../backend
[ ! -d ./"node_modules" ] && npm i
sleep 5 && open http://localhost:3000 &
npm start