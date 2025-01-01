const {
    getAllMovies, saveMovie, updateMovieById, deleteMovieById, findMovieById, countMovies
} = require("../../models/movies/movies.model");
const {getPagination} = require("../../services/query");

async function httpGetAllMovies(req, res) {
    const {limit, skip} = getPagination(req.query);
    const movies = await getAllMovies(limit, skip);
    const count = await countMovies()
    return res.status(200).json({movies, total: count});
}

async function httpAddMovie(req, res) {
    const movie = req.body;
    if (!movie.title || !movie.image) {
        return res.status(400).json({
            error: "Some missing properties are required",
        });
    }

    try {
        const savedMovie = await saveMovie(movie);
        return res.status(201).json(savedMovie);
    } catch (err) {
        return res.status(500).json({
            error: "Failed to save movie",
        });
    }
}

async function httpUpdateMovie(req, res) {
    const movieId = req.params.id;
    const updateData = req.body;

    try {
        const updatedMovie = await updateMovieById(movieId, updateData);
        if (!updatedMovie) {
            return res.status(404).json({
                error: `Movie with id ${movieId} not found`,
            });
        }
        return res.status(200).json(updatedMovie);
    } catch (err) {
        return res.status(500).json({
            error: "Failed to update movie",
        });
    }
}

async function httpDeleteMovie(req, res) {
    const movieId = req.params.id;

    try {
        const deleted = await deleteMovieById(movieId);
        if (!deleted) {
            return res.status(404).json({
                error: `Movie with id ${movieId} not found`,
            });
        }
        return res.status(200).json({
            ok: true,
        });
    } catch (err) {
        return res.status(500).json({
            error: "Failed to delete movie",
        });
    }
}

async function httpGetMovieById(req, res) {
    const movieId = req.params.id;

    try {
        const movie = await findMovieById(movieId);
        if (!movie) {
            return res.status(404).json({
                error: `Movie with id ${movieId} not found`,
            });
        }
        return res.status(200).json(movie);
    } catch (err) {
        return res.status(500).json({
            error: "Failed to get movie detail",
        });
    }
}

module.exports = {
    httpGetAllMovies, httpAddMovie, httpUpdateMovie, httpDeleteMovie, httpGetMovieById
};
