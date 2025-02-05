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
1. Set up `~/.ssh/config` to contain an entry as follows:
```sh
Host radio-map
  HostName 3.224.32.55
  User ec2-user
  AddKeysToAgent yes
  IdentityFile ~/.ssh/aws-radio-map.pem
```
2. Deploy code with `sh deploy-code.sh`
3. Install nginx with `sudo dnf install nginx`
4. Paste nginx config from radio.andersan.com.conf into /etc/nginx/conf.d/radio-map.conf
5. Install node 20 as shown here https://tecadmin.net/install-latest-nodejs-amazon-linux/
6. Install yarn and pm2 globally
7. `mkdir apps && mkdir apps/radio-map && cd apps/radio-map`
8. Run the project's frontend and backend:
```sh
cd frontend && yarn build && pm2 start 'yarn start' --name 'frontend'
cd backend && yarn build && pm2 start 'yarn start' --name 'backend'
```
9. Ensure DNS and network settings have been set up properly for the VM

## troubleshooting

Check if the frontend and backend are up:
`pm2 status`
`pm2 logs`
`curl localhost:3000` should return something like the following in the VM:
<!DOCTYPE html><html><head><meta charSet="utf-8"/><title>Radio map</title><meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"/><link rel="icon" type="image/x-icon" href="/favicon.ico"/><meta name="next-head-count" content="4"/><link rel="preload" href="/_next/static/css/66960659a0e4fd4d.css" as="style"/><link rel="stylesheet" href="/_next/static/css/66960659a0e4fd4d.css" data-n-g=""/><noscript data-n-css=""></noscript><script defer="" nomodule="" src="/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js"></script><script src="/_next/static/chunks/webpack-823d49b6d1adf925.js" defer=""></script><script src="/_next/static/chunks/framework-627943b9921af9c4.js" defer=""></script><script src="/_next/static/chunks/main-d60f1239c3223b7f.js" defer=""></script><script src="/_next/static/chunks/pages/_app-85ee7e704efd697b.js" defer=""></script><script src="/_next/static/chunks/pages/index-afcdb883c7e88762.js" defer=""></script><script src="/_next/static/whHv9Qpq1Hy1mjkMTYc3r/_buildManifest.js" defer=""></script><script src="/_next/static/whHv9Qpq1Hy1mjkMTYc3r/_ssgManifest.js" defer=""></script></head><body><div id="__next"></div><script id="__NEXT_DATA__" type="application/json">{"props":{"pageProps":{}},"page":"/","query":{},"buildId":"whHv9Qpq1Hy1mjkMTYc3r","nextExport":true,"autoExport":true,"isFallback":false,"scriptLoader":[]}</script></body></html>
`curl localhost:5000` returns something like: <!DOCTYPE html><html><head><title>Express</title><link rel="stylesheet" href="/stylesheets/style.css"></head><body><h1>Express</h1><p>Welcome to Express</p></body></html>[ec2-user@ip-172-31-25-144 frontend]$ 

## use SSL/HTTPS

Run this in the remote server:

```sh
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d radio.andersan.com
```

Or the following, on amazon linux 2023:

```sh
# if using dnf
sudo dnf update
sudo dnf install certbot python3-certbot-nginx
sudo certbot --nginx -d radio.andersan.com
# if using yum
# sudo yum update
# sudo yum install certbot python3-certbot-nginx
# sudo certbot --nginx -d radio.andersan.com
```

Rename `apps/radio-map/radio.andersan.com.ssl.conf` to 