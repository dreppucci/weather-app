#!/bin/sh
# ideas used from https://gist.github.com/motemen/8595451

# abort the script if there is a non-zero error
set -e

# show where we are on the machine
pwd

remote="https://github.com/dreppucci/weather-app.git"

siteSource="build"

npm install
npm cache clean
npm rebuild node-sass
npm run build

git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1
git init
git remote add --fetch origin "$remote"

./node_modules/gh-pages/bin/gh-pages -d ${siteSource}