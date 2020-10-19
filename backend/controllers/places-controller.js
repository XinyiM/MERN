const HttpError = require("../models/http-error");
const { validationResult } = require('express-validator');
const uuid = require("uuid/dist/v4");
let DUMMY_PLACES = [
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


const getPlacesbyUserId =  (req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });
    if(!places || places.length === 0){
        // const error = new Error("Could not find a place for the provided id.");
        // error.code = 404;
        // return next(error); // trigger the error handling 
        return next(new HttpError("Could not find a place for the provided id.", 404));
    }
    res.json({ places });
};

const createPlace = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
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

const updatePlaceById = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        throw new HttpError("Invalid inputs passed, please check your data.", 422);
    }
    // only allowed to update description and title
    const { title, description } = req.body;
    const placeId = req.params.pid;
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId)};
    // create a copy of the place
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({place: updatedPlace});

};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p => p.id === placeId)){
        throw new HttpError('Could not find a place for that id.', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== req.params.pid);
    res.status(200).json({message: "Deleted Place."});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesbyUserId = getPlacesbyUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;