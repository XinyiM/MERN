const express = require('express');
const userControllers = require("../controllers/users-controller");
const router = express.Router();


router.get("/", userControllers.getAllUsers);

router.post("/signup",  userControllers.signUp);

router.post("/login", userControllers.logIn);

module.exports = router;