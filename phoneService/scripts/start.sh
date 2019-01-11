#!/usr/bin/env bash

./wait-for-it.sh --timeout=30 db:3306 -- echo "DB is up"
npm i
npm run migrate
npm start