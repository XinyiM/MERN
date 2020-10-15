const HttpError = require("../models/http-error");

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

// Middleware Functions Controllers
const getPlaceById = (req, res, next) => {
    // console.log("GET Request in Places");
    const placeId = req.params.pid; // {pid: 'p1'}
    const place = DUMMY_PLACES.find((p) => {
        return p.id === placeId;
    });
    if(!place){
        // const error = new Error("Could not find a place for the provided id.");
        // error.code = 404;
        // throw error; // trigger the error handling 
        // // do not return
        throw new HttpError("Could not find a place for the provided id.", 404);
    }
    res.json({place}); // { place } => {place : place }
    // send response containing JSON format
    // res.json({message: 'It Works!'});
}

// function getPlaceById() {...}
// const getPlaceById = function() {....}


const getPlacebyUserId =  (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });
    if(!place){
        // const error = new Error("Could not find a place for the provided id.");
        // error.code = 404;
        // return next(error); // trigger the error handling 
        return next(new HttpError("Could not find a place for the provided id.", 404));
    }
    res.json({place});
};

exports.getPlaceById = getPlaceById;
exports.getPlacebyUserId = getPlacebyUserId;