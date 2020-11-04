const HttpError = require("../models/http-error");
const { validationResult } = require('express-validator');
// const { v4 : uuidv4 } = require("uuid");
const getCoordsForAddress = require("../util/location");
const Place = require('../models/place');


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
const getPlaceById = async (req, res, next) => {
    // console.log("GET Request in Places");
    // const place = DUMMY_PLACES.find((p) => {
    //     return p.id === placeId;
    // });
        // const error = new Error("Could not find a place for the provided id.");
        // error.code = 404;
        // throw error; // trigger the error handling 
        // // do not return
    // 1. Place is a mongoose object, turn it into javascript object
    // 2. remove the underscore from the _id
    // send response containing JSON format
    // res.json({message: 'It Works!'});
    const placeId = req.params.pid; // { pid: 'p1' }
    let place;
    try {
      place =  await Place.findById(placeId);
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a place.',
        500
      );
      return next(error);
    }
  
    if (!place) {
      const error = new HttpError(
        'Could not find a place for the provided id.',
        404
      );
      return next(error);
    }
    console.log(place);
    res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }   
}



// function getPlaceById() {...}
// const getPlaceById = function() {....}


const getPlacesbyUserId = async (req, res, next) => {
    const userId = req.params.uid; // { pid: 'p1' }
    let places;
    console.log(userId);
    try {
      places =  await Place.find({creator: userId});
    } catch (err) {
      const error = new HttpError(
        'Something went wrong, could not find a place.',
        500
      );
      return next(error);
    }
  
    if (!places || places.length === 0) {
      const error = new HttpError(
        'Could not find a place for the provided id.',
        404
      );
      return next(error);
    }
    // console.log(places);
    res.json({ places: places.map(place => place.toObject({ getters: true})) }); 
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        // in async functions, you should use next but not throw
        next(new HttpError("Invalid inputs passed, please check your data.", 422));
    }
    //get data from post request body.
    const { title, description, address, creator} = req.body;
    
    // use await when call an async function
    let coordinates;
    // handle error in an async way => wrap this into try/catch block
    try{
        coordinates = await getCoordsForAddress(address);
    } catch(error){
        return next(error);
    }

    // Just a shortcut for const title = req.body.title;
    const createdPlace = new Place({
        title,
        description,
        image: 'https://images.app.goo.gl/vi8KGGrd3bBseVRi9',
        address,
        location: coordinates,
        creator
    });
    
    try{
        console.log(createdPlace);
        await createdPlace.save();
    } catch (err){
        const error = new HttpError(
            'Creating place failed, please try again!',
            500
        );
        return next(err);
    }
    // DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)
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