const express = require("express");
const {signIn, signUp} = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);

module.exports = authRouter