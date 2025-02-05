#!/usr/bin/env bash

# Build both the backend and frontend to ensure it works:
cd backend
yarn build
cd ../frontend
yarn build
cd ..

# Copying over the sources:
rsync -avPe ssh --delete \
--exclude node_modules \
--exclude .git \
--exclude .next \
--exclude coverage \
--exclude *.spec.* \
--exclude *.md \
--exclude *.log \
--exclude test/* \
--exclude */docs/* \
--exclude frontend/.env \
--exclude frontend/.env.local \
backend \
frontend \
radio.andersan.com.conf \
radio.andersan.com.ssl.conf \
radio-map:apps/radio-map/

ssh radio-map "cd ~/apps/radio-map/backend && yarn build"
ssh radio-map "cd ~/apps/radio-map/frontend && yarn build"
ssh radio-map "pm2 restart all"
ssh radio-map "pm2 logs"
