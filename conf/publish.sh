#!/bin/sh

npm run build && \
cd dist && \
npm publish
