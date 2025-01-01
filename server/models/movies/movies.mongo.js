const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    title: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
     year: {
        type: Number,
        default: new Date().getFullYear(),
    },
    image: String
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie
