var express = require('express');
var router = express.Router();
import {getAllPlacesInRG, searchPlacesAndChannels, customGetStreamUrl, getSpecificPlace, getAllChannelsInSpecificPlace, getChannelInfo } from "../public/javascripts/radio-garden-api/radio-garden-express"
import {inspect} from "util";


// import {Place, SearchResult, PlaceContentContentInner, AraContentPagePlaceIdGet200ResponseAllOfData, SelectedStations, ChannelRef, LocalPickStations, LocalPopularStations, AraContentPagePlaceIdChannelsGet200Response, AraContentPagePlaceIdChannelsGet200ResponseAllOfData} from "../api"

const logResults = true;

/* GET a radio station streaming URL. */
router.get('/stream', async (req, res, next) => {
  console.log("customGetStreamURL");
  var result = await customGetStreamUrl(req.query.channelId);
  
  if (logResults)
    console.log(inspect(result, true, 5));

  res.json({
    streamURL: result
  });
});

/* GET a place's data */
router.get('/place-info', async (req, res, next) => {
  console.log("getSpecificPlace");
  var result = await getSpecificPlace(req.query.placeId);

  if (logResults)
    console.log(inspect(result, true, 5));

  res.json(result);
});

/* GET a place's data */
router.get('/channel-info', async (req, res, next) => {
  console.log("getSpecificChannel");
  var result = await getChannelInfo(req.query.channelId);

  if (logResults)
    console.log(inspect(result, true, 5));

  res.json(result);
});

/* GET a place's channels */
router.get('/place-channels', async (req, res, next) => {
  console.log("getAllChannelsInSpecificPlace");
  var result = await getAllChannelsInSpecificPlace(req.query.placeId);

  if (logResults)
    console.log(inspect(result, true, 5));

  res.json(result);
});

/* SEARCH for places and channels */
router.get('/search', async (req, res, next) => {
  console.log("searchPlacesAndChannels");
  var result = await searchPlacesAndChannels(req.query.searchQuery);

  if (logResults)
    console.log(inspect(result, true, 5));

  res.json(result);
});

//api/radio-direct



module.exports = router;
