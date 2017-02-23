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

# switch into the the gh-pages branch
if git rev-parse --verify origin/gh-pages > /dev/null 2>&1
then
    git checkout -b gh-pages
    # delete any old site as we are going to replace it
    # Note: this explodes if there aren't any, so moving it here for now
    #git rm -rf .
else
    git checkout --orphan gh-pages
fi

# copy over or recompile the new site
cp -a "../${siteSource}/." .

cd ..

find . -maxdepth 1 ! -name 'gh-pages-branch' ! -name '.git' ! -name '.gitignore' -exec rm -rf {} \;
ls -la
mv gh-pages-branch/* .
ls -la
rm -rf gh-pages-branch

# stage any changes and new files
git add -A
# now commit, ignoring branch gh-pages doesn't seem to work, so trying skip
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]"
# and push, but send any output to /dev/null to hide anything sensitive
git push --force --quiet origin gh-pages #> /dev/null 2>&1

echo "Finished Deployment!"