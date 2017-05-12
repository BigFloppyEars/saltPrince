const express = require("express");
const colors = require("colors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const serverController = require("./Controllers/serverController.js");

const passport = require("passport");
const Strategy = require('passport-google-oauth20').Strategy;

passport.use(new Strategy({
    clientID: "558027390008-1peo1pov1lvpapa257oe5b58n8d5efk6.apps.googleusercontent.com",
    clientSecret: "JvfDhn31LtQAggNR6eaK8igd",
    callbackURL: "http://localhost:8080/login/google/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Set up express server
const app = express();

  app.use(cookieParser());
  app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

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
