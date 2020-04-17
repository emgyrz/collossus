#!/bin/bash

set -e

TMP_DOCS_DIR="/tmp/collosus_docs"
DOCS_DIR="docs/html"
VERSION=$(sed -n 's/.*"version": "\(.*\)",/\1/p' package.json)

echo "Switching to master branch"
git checkout master && \

echo "Compiling docs"
npm run doc && \

echo "Copying docs to temp dir"
rsync -av "${DOCS_DIR}/" $TMP_DOCS_DIR --delete

echo "Switching to gh-pages branch"
git checkout gh-pages && \

echo "Copying docs from temp dir to current"
rsync -av "${TMP_DOCS_DIR}/" . && \

echo "Pushing to repo"
git add . && \
git commit -m "gh-pages ${VERSION}" && \
git push && \

echo "Switching to master branch"
git checkout master
