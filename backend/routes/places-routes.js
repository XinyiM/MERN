const express = require('express');
const { check } = require('express-validator');
const placesControllers = require("../controllers/places-controller");

const router = express.Router();

// Goal of this API: have a get request where id is part of the URL
// return the information with the id p1, thus the id should be encoded in the url

//register route on specific http methods
router.get('/:pid', placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesbyUserId);

// any post request that targets /api/places/ will automatically reach this post route here.  
// therefore the post request should contain just a slash '/'
router.post(
    "/", 
    [
        check('title')
            .not()
            .isEmpty(), 
        check('description').isLength({min: 5, }),
        check('address')
            .not()
            .isEmpty(),
    ],
    placesControllers.createPlace);
// you can add multiple middleware 

router.patch('/:pid',
    [
        check('title').notEmpty()
        ,check('description').isLength({min: 5, })
    ],
    placesControllers.updatePlaceById);
router.delete('/:pid', placesControllers.deletePlace);
module.exports = router;