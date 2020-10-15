const express = require('express');

const placesControllers = require("../controllers/places-controller");

const router = express.Router();

// Goal of this API: have a get request where id is part of the URL
// return the information with the id p1, thus the id should be encoded in the url

//register route on specific http methods
router.get('/:pid', placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacebyUserId);


module.exports = router;