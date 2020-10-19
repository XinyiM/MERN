const express = require('express');
const bodyParser = require('body-parser');;
const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/users-routes");
const HttpError = require('./models/http-error');

const app = express();
 
//register middleware functions

//route certern requests to certain functions 
//that should be executed upon those requests

// parse any incoming request body and extract any JSON data, 
// convert it into reguar js Data structures and call next functions automatically
app.use(bodyParser.json());

//use the placesRoutes as a middleware
app.use('/api/places', placesRoutes); // => /api/palces/something
app.use('/api/users', userRoutes);

//add middleware is only reached if some request that didnt get a response
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
});

// error handling
app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    // No response has been sent
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured!"});
});

// listen on a server port
app.listen(5000);