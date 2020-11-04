const HttpError = require("../models/http-error");
const uuid = require('uuid/dist/v4');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Balba',
        email: "bala@gmail.com",
        password: "123456"
    }
];

const getAllUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
};

const signUp = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        // in async method, do not use throw, use next(error) instead
        return next (
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }
    const { name, email, password, places } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch(err){
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    if(existingUser){
        const error = new HttpError(
            'User existing already.',
            422
        );
        return next(error);
    }
    
    const createdUser = new User({
        name, 
        email,
        image: 'https://images.app.goo.gl/vi8KGGrd3bBseVRi9',
        password,
        places,
    });

    try{
        console.log(createdUser);
        await createdUser.save();
    } catch (err){
        const error = new HttpError(
            'Signing up failed, please try again!',
            500
        );
        return next(error);
    }
    res.status(202).json({ user: createdUser.toObject({ getters : true}) });
};

const logIn = (req, res, next) => {
    const { email, password } = req.body;
    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError("Could not identify the user, credentials seem to be wrong!", 401);
    }
    res.json({ message: "Log In!"}); 
};

exports.getAllUsers = getAllUsers;
exports.signUp = signUp;
exports.logIn = logIn;