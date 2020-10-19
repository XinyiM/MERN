const HttpError = require("../models/http-error");
const uuid = require('uuid/dist/v4');

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

const signUp = (req, res, next) => {
    const { name, email, password } = req.body;
    const hasUser = DUMMY_USERS.find(u => u.email === email);
    if(hasUser){
        throw new HttpError("Already has a user with same email address.");
    }
    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    };
    DUMMY_USERS.push(createdUser);
    res.status(202).json({ user: createdUser });
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