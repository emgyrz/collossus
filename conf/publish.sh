#!/bin/sh

set -e

npm run test && \
npm run build && \
./conf/move_package_json.js && \
cd dist && \
npm publish
