const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const usersRouter = require('../routes/users/users.routes');
const moviesRouter = require('../routes/movies/movies.routes');
const authRouter = require('../routes/auth/auth.routes');

app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(express.json({limit: '10mb'}));
app.use(morgan("combined"));
app.use("/api/users", usersRouter)
app.use("/api/movies", moviesRouter)
app.use("/api/auth", authRouter)

app.use((err, req, res, next) => {
    console.log(err.stack);
    next(err);
});

app.use((err, req, res, next) => {
    if (req.xhr) {
        res.status(500).json({message: "Internal Server error", error: err});
    } else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    res.status(500);
    res.send({message: "error", error: err});
});



module.exports = app;
