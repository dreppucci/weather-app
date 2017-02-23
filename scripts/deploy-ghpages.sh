#!/bin/sh
# ideas used from https://gist.github.com/motemen/8595451

# abort the script if there is a non-zero error
set -e

# show where we are on the machine
pwd

remote=$(git config remote.origin.url)

siteSource="build"

npm install
npm cache clean
npm rebuild node-sass
npm run build

# make a directory to put the gp-pages branch
mkdir gh-pages-branch
cd gh-pages-branch
# now lets setup a new repo so we can update the gh-pages branch
git config --global user.email "$GH_EMAIL" > /dev/null 2>&1
git config --global user.name "$GH_NAME" > /dev/null 2>&1
git init
git remote add --fetch origin "$remote"

git checkout -b gh-pages

# copy over or recompile the new site
cp -a "../${siteSource}/." .

cd ..

find . -maxdepth 1 ! -name 'gh-pages-branch' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
mv gh-pages-branch/* .
rm -rf gh-pages-branch

git add .
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]"
git push -u --force origin gh-pages:gh-pages #> /dev/null 2>&1

echo "Finished Deployment!"