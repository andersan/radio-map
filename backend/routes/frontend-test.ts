var express = require('express');
var router = express.Router();
import {readFileSync} from 'fs';

router.get('/', async (req, res, next) => {
  console.log("fetching data --- frontend express test");
  res.json({
    title: 'Radio garden api test',
    streamURL: 'https://royaltonradio.streamguys1.com/live?listening-from-radio-garden=1665352600',
    // placeData: await getAllPlacesInRG(),
    // searchData: await searchPlacesAndChannels("ondas"),
    // someStreamURL: await getSomeStream()
  });
});

// return a list of all places in radio garden

var placeJSON = readFileSync('./places-export-curl.json',
  {encoding:'utf8', flag:'r'});
var allPlacesData = JSON.parse(placeJSON);

router.get('/json', async (req, res, next) => {
  console.log("fetching data --- frontend express test");
  res.json({
    "place-data": allPlacesData
  });
});

// return a sample response for a place's info

var placeInfoJSON = readFileSync('./place-info.json',
  {encoding:'utf8', flag:'r'});
var placeInfoData = JSON.parse(placeInfoJSON);

router.get('/place-info', async (req, res, next) => {
  console.log("fetching data --- frontend express test");
  res.json({
    "place-info": placeInfoData
  });
});

// return a sample response for a channel's info

var channelInfoJSON = readFileSync('./channel-info.json',
  {encoding:'utf8', flag:'r'});
var channelInfoData = JSON.parse(channelInfoJSON);
// console.log("channelInfoData: " + channelInfoJSON);

router.get('/channel-info', async (req, res, next) => {
  console.log("fetching data --- frontend express test channel-info");
  res.json(channelInfoData);
});

// return a sample response for a place's channels

var placeChannelsJSON = readFileSync('./place-channels.json',
{encoding:'utf8', flag:'r'});
var placeChannelsData = JSON.parse(placeChannelsJSON);

router.get('/place-channels', async (req, res, next) => {
  console.log("fetching data --- frontend express test");
  res.json({
    "place-channels": placeChannelsData
  });
});

// return a sample response for a search query

var searchQueryJSON = readFileSync('./search-query.json',
{encoding:'utf8', flag:'r'});
var searchQueryData = JSON.parse(searchQueryJSON);

router.get('/search', async (req, res, next) => {
  console.log("fetching data --- frontend express test");
  res.json({
    "search": searchQueryData
  });
});

module.exports = router;
