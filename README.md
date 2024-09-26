# Radio Map

<!---
build not set up yet
[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
-->

Radio map is a clone of radio.garden, hosted on AWS and built on a MERN stack.
[Test it out here.]

## Features

- Browse radio stations throughout the world
- Listen to internet radio
- See most popular stations in different areas

## Running the repo locally

To run the project locally, run the following:
```sh
git clone https://github.com/andersan/radio-map.git
```

Start the express server in one terminal: 
```sh
cd backend
yarn install
yarn run dev
```

Start the frontend in another terminal:
```sh
cd frontend
yarn install
yarn run dev
```

For debugging the backend, use `npm run dev >> logfile.log`. Anything crashing the backend is likely caused by an uncaught API issue.

Note that the frontend project requires a .env.local file with the following variables assigned:
- NEXT_PUBLIC_ENVRIONMENT: set this to "development" for running locally
- NEXT_PUBLIC_CESIUM_ACCESS_TOKEN: api token for cesium Ion access (maps/images)

## Planned future features

- Search functionality
- Basic user functionality (save a list of fave stations)
- Manage states with Redux, allowing for an easy back button in menu navigation
- Browse using alternative station list from [Radio browser API]
- Radio station list view (also using Radio browser API)
- Allow users to submit corrections and new stations
- Video streaming map
- Allow running front and back end with one command (use concurrently)

[Test it out here.]: <https://radio.andersan.com>
[Radio browser API]: <https://api.radio-browser.info/>

## get remote server ready

These steps work on an amazon linux x86 (non-arm) VM with 2gb RAM or more:
1. Deploy code with deploy-code.sh
2. Install nginx with `sudo dnf install nginx`
3. Paste nginx config from radio.andersan.com.conf into /etc/nginx/conf.d/radio-map.conf
4. Install node 20 as shown here https://tecadmin.net/install-latest-nodejs-amazon-linux/
5. Install yarn and pm2 globally
6. Build and run the project's frontend and backend
7. Ensure DNS and network settings have been set up properly for the VM