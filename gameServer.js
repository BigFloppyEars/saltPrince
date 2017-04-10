const express = require("express");
const colors = require("colors");
const path = require("path");
const bodyParser = require("body-parser");
const controller = require("./Controllers/serverController.js");

// Set up express server
const app = express();

// Set template engine
app.set("view engine", "pug");

// Serve static files
app.use(express.static("Assets"));

// Set post parsing middleware
app.use(bodyParser.urlencoded({extended: false}));

// Handle routing and request logic
controller(app);

// Listen for requests at port 3000
app.listen(8080);

console.log("Server running.".magenta.redBG);
