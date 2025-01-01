const Movie = require('./movies.mongo');

/**
 * Save a new movie to the database.
 * @param {Object} movieData - Data of the movie to save.
 * @returns {Promise<Object>} - The saved movie document.
 */
async function saveMovie(movieData) {
    try {
        const movie = new Movie(movieData);
        return await movie.save();
    } catch (error) {
        console.error(`Error saving movie: ${error}`);
        throw new Error('Could not save movie');
    }
}

/**
 * Find a movie by its ID.
 * @param {string} movieId - The ID of the movie to find.
 * @returns {Promise<Object|null>} - The found movie or null if not found.
 */
async function findMovieById(movieId) {
    return Movie.findById(movieId);
}

/**
 * Count the total number of movies.
 * @returns {Promise<number>} - The total count of movies.
 */
async function countMovies() {
    return  Movie.countDocuments();
}


/**
 * Update a movie by its ID.
 * @param {string} movieId - The ID of the movie to update.
 * @param {Object} updateData - Data to update the movie with.
 * @returns {Promise<Object|null>} - The updated movie or null if not found.
 */
async function updateMovieById(movieId, updateData) {
    try {
        return await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
    } catch (error) {
        console.error(`Error updating movie: ${error}`);
        throw new Error('Could not update movie');
    }
}

/**
 * Delete a movie by its ID.
 * @param {string} movieId - The ID of the movie to delete.
 * @returns {Promise<boolean>} - True if the movie was deleted, false otherwise.
 */
async function deleteMovieById(movieId) {
    const result = await Movie.findByIdAndDelete(movieId);
    return result !== null;
}

/**
 * Get all movies with pagination.
 * @param {number} limit - The maximum number of movies to return.
 * @param {number} skip - The number of movies to skip.
 * @returns {Promise<Array<Object>>} - An array of movies.
 */
async function getAllMovies(limit, skip) {
    return Movie.find({}, {__v: 0})
        .sort({createdAt: -1}) // Sort by newest first
        .skip(skip)
        .limit(limit);
}

module.exports = {
    saveMovie,
    findMovieById,
    updateMovieById,
    deleteMovieById,
    getAllMovies,
    countMovies
};
