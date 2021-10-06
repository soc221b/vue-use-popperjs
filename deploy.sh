#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn run vitepress build document

# navigate into the build output directory
cd document/.vitepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:iendeavor/vue-use-popperjs.git HEAD:docs

cd -
