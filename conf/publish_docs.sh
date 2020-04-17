#!/bin/bash

set -e

TMP_DOCS_DIR="/tmp/collosus_docs"
DOCS_DIR="docs/html"
VERSION=$(sed -n 's/.*"version": "\(.*\)",/\1/p' package.json)

log() {
  printf "\n[PUB_DOCS]: $1\n"
}

log "Switching to master branch"
git checkout master && \

log "Compiling docs"
npm run doc && \

log "Copying docs to temp dir"
rsync -av "${DOCS_DIR}/" $TMP_DOCS_DIR --delete

log "Switching to gh-pages branch"
git checkout gh-pages && \

log "Copying docs from temp dir to current"
rsync -av "${TMP_DOCS_DIR}/" . && \

log "Pushing to repo"
git add . && \
git commit -m "gh-pages ${VERSION}" && \
git push && \

log "Switching to master branch"
git checkout master


log "Done!"
