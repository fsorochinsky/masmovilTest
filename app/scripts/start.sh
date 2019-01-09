#!/usr/bin/env bash

./wait-for-it.sh db:3306 -- echo "DB is up"
npm i
npm run migrate
npm start