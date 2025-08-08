#!/bin/bash

mkdir -p ./dist
mkfile ./dist/entry.js
cat ./src/jquery.js ./src/index.js  | tr -s '\n\t' ' ' > ./dist/entry.js