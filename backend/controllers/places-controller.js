const HttpError = require("../models/http-error");
const uuid = require("uuid/dist/v4");
const DUMMY_PLACES = [
    {
        id:"p1",
        title:"Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        location: {
            lat: 40.7484474,
            lng: -73.981516
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

const createPlace = (req, res, next) => {
    //get data from post request body.
    const { title, description, coordinates, address, creator} = req.body;
    // Just a shortcut for const title = req.body.title;
    const createdPlace = {
        id: uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };
    DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)
    res.status(201).json({place: createdPlace}); // 201 is code when sth is created on the server
    // 200 is the normal success code

};

exports.getPlaceById = getPlaceById;
exports.getPlacebyUserId = getPlacebyUserId;
exports.createPlace = createPlace;