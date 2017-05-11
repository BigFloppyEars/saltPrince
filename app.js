const express = require("express");
const colors = require("colors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const serverController = require("./Controllers/serverController.js");
//const dbController = require("./Controllers/databaseController.js");

const passport = require("passport");

// Set up express server
const app = express();

 /* app.use(cookieParser());
  //app.use(express.logger());
  //app.use(express.methodOverride());
  app.use(session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());*/

// Set template engine
app.set("view engine", "pug");

// Serve static files
app.use(express.static("Assets"));

// Set post parsing middleware
app.use(bodyParser.urlencoded({extended: false}));

// Handle routing and request logic
serverController.getREQs(app);
serverController.postREQs(app);

// Listen for requests at port 3000
app.listen(8080);

console.log("Server running.".magenta.whiteBG);
