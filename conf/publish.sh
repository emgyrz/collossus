#!/bin/sh

set -e

npm run test && \
npm run build && \
cd dist && \
npm publish
