const http = require("http");
require("dotenv").config();
require("mongoose");
const app = require("./app");
const {connectMongo} = require("../services/mongo");
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

async function startServer() {
    await connectMongo();
    server.listen(PORT, () => {
        console.log(`Server is running on  ${PORT}`);
    });
}

startServer();
