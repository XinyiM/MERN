const express = require('express');


const router = express.Router();


const DUMMY_PLACES = [
    {
        id:"p1",
        title:"Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        location: {
            lat: 40.7484474,
            lng: -73981516
        },
        address: "20 W 34th St. New York, NY  10001",
        creator: 'u1'
    }
];


// Goal of this API: have a get request where id is part of the URL
// return the information with the id p1, thus the id should be encoded in the url


//register route on specific http methods
router.get('/:pid', (req, res, next) => {
    // console.log("GET Request in Places");
    const placeId = req.params.pid; // {pid: 'p1'}
    const place = DUMMY_PLACES.find((p) => {
        return p.id === placeId;
    });
    if(!place){
        const error = new Error("Could not find a place for the provided id.");
        error.code = 404;
        throw error; // trigger the error handling 
        // do not return
    }
    res.json({place}); // { place } => {place : place }
    // send response containing JSON format
    // res.json({message: 'It Works!'});
});

router.get("/user/:uid", (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });
    if(!place){
        const error = new Error("Could not find a place for the provided id.");
        error.code = 404;
        return next(error); // trigger the error handling 
    }
    res.json({place});
});


module.exports = router;