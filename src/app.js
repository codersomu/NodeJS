const express = require("express");
const http = require("http");
const cors = require("cors");
const api = require("./api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.port || 5000;

// Initializing app
let app = express();

// Middleware's
// app.options("*", cors());
app.use(cors({ credentials: true, origin: true }));

// creating Router
const router = express.Router();
app.use(router);

app.use(bodyParser.json());

/**
 * Db setup 
 */
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// creating server
let server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("<h1>Course Managment</h1><p>Api Panel</p>");
});

app.use("/api", api);

// Server Listing
server.listen(port, () => console.log(`listening on port ${port}`));
