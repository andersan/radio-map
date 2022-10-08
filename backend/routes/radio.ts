var express = require('express');
var router = express.Router();
import {getAllPlacesInRG, searchPlacesAndChannels, getSomeStream} from "../public/javascripts/radio-garden-api/radio-garden-express"

/* GET radio page. */
router.get('/', async (req, res, next) => {
  res.render('radio', {
    title: 'Radio garden api test',
    placeData: await getAllPlacesInRG(),
    searchData: await searchPlacesAndChannels("ondas"),
    someStreamURL: await getSomeStream()
  });
});

module.exports = router;
