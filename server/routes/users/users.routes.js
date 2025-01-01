const express = require("express");
const {
    httpGetAllUsers,
    httpAddUser,
    httpUpdateUser,
    httpDeleteUser,
} = require("./users.controller");

const usersRouter = express.Router();

usersRouter.get("/", httpGetAllUsers);
usersRouter.post("/", httpAddUser);
usersRouter.put("/:id", httpUpdateUser);
usersRouter.delete("/:id", httpDeleteUser);

module.exports = usersRouter

