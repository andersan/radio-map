#!/usr/bin/env bash

# Copying over the sources:
rsync -avPe ssh --delete \
--exclude node_modules \
--exclude .next \
--exclude .git \
--exclude coverage \
--exclude *.spec.* \
--exclude *.md \
--exclude test/* \
--exclude */docs/* \
backend \
frontend \
radio-map:apps/radio-map/

#ssh radio-map "pm2 logs"