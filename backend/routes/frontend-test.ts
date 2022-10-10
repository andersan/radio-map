var express = require('express');
var router = express.Router();
import {readFileSync} from 'fs';
import {getAllPlacesInRG, searchPlacesAndChannels, getSomeStream} from "../public/javascripts/radio-garden-api/radio-garden-express"

/* GET radio page. */
// router.get('/', async (req, res, next) => {
//   res.render('radio', {
//     title: 'Radio garden api test',
//     placeData: await getAllPlacesInRG(),
//     searchData: await searchPlacesAndChannels("ondas"),
//     someStreamURL: await getSomeStream()
//   });
// });

router.get('/', async (req, res, next) => {
  console.log("fetching data --- frontend express test");
  res.json({
    title: 'Radio garden api test',
    savedStreamURL: 'https://royaltonradio.streamguys1.com/live?listening-from-radio-garden=1665352600',
    // placeData: await getAllPlacesInRG(),
    // searchData: await searchPlacesAndChannels("ondas"),
    // someStreamURL: await getSomeStream()
  });
});

var placeJSON = readFileSync('./places-export-curl.json',
  {encoding:'utf8', flag:'r'});
var placeData = JSON.parse(placeJSON);


router.get('/json', async (req, res, next) => {
  console.log("fetching data --- frontend express test");
  res.json({
    "place-data": placeData
  });
});

module.exports = router;
