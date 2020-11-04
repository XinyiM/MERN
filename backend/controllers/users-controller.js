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

const getAllUsers = async (req, res, next) => {
    let users;
    try{
        users = await User.find({}, '-password');
    } catch(err){
        return next(new HttpError(
            'Fetching users failed, please try agian later.',
            500
        ));
    }
    res.json({users: users.map(user => 
        user.toObject({getters: true})
    )});
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

const logIn = async (req, res, next) => {
    const { email, password } = req.body;
    // const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch(err){
        const error = new HttpError(
            'Login in failed, please try again later.',
            500
        );
        return next(error);
    }
    console.log(existingUser);
    if(!existingUser || existingUser.password !== password){
        const error = new HttpError(
            "Invalid credentials, can not log you in.",
            401
        );
        return next(error);
    }

    res.json({ message: "Log In!"}); 
};

exports.getAllUsers = getAllUsers;
exports.signUp = signUp;
exports.logIn = logIn;