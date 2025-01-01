const express = require("express");
const {
    httpGetAllMovies, httpAddMovie, httpUpdateMovie, httpDeleteMovie, httpGetMovieById
} = require("./movies.controller");

const auth = require("../../middlewares/auth")

const moviesRouter = express.Router();

moviesRouter.get("/", auth, httpGetAllMovies);
moviesRouter.post("/", auth, httpAddMovie);
moviesRouter.put("/:id",auth, httpUpdateMovie);
moviesRouter.get("/:id",auth, httpGetMovieById);
moviesRouter.delete("/:id",auth, httpDeleteMovie);

module.exports = moviesRouter
