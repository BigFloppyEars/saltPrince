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
    callbackURL: "/login/google/return"
  },
   (accessToken, refreshToken, profile, cb) => {
    // ^-v-^-v-^from passport-google-oauth github example^-v-^-v-^
    return cb(null, profile);
  }));

// Configure Passport authenticated session persistence.
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser((user, cb) => {
  //console.log(user);
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

// Set up express server
const app = express();

// Set up various middlewares
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(session({ secret: 'none', resave: false, saveUninitialized: true, maxAge: 6000}));

app.use(passport.initialize());

app.use(passport.session());

app.use((req, res, next) => {
  if (req.user !== undefined) {
    if (req.user.displayName !== undefined) {
      res.locals.user = req.user.displayName
    }
    else {
      res.locals.user = req.user
    }
  } else {
    res.locals.user = "Guest";
  }
  next();
});

// Set template engine
app.set("view engine", "pug");

// Serve static files
app.use(express.static("Assets"));

// Handle routing and request logic
serverController.getREQs(app);
serverController.postREQs(app);

// Listen for requests at port 3000
app.listen(80);

console.log("Server running.".magenta.whiteBG);
