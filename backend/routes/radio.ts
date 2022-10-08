var express = require('express');
var router = express.Router();
import {getPlaceTest, searchPlacesAndChannels, getSomeStream} from "../public/javascripts/radio-garden-api/radio-garden-express"


// async function route() {
//   var placeData = await getPlaceTest();
//   var searchData = await searchTest("ondas");
//   var liveStreamTest = await getLiveStream(searchData![0]._id!);
// }

/* GET home page. */
router.get('/', async (req, res, next) => {
  res.render('radio', {
    title: 'Radio garden api test',
    placeData: await getPlaceTest(),
    searchData: await searchPlacesAndChannels("ondas"),
    someStreamURL: await getSomeStream()
    // liveStreamTest: await getLiveStream2("602749") //
  });
});

module.exports = router;
