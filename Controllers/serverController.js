const fs = require("fs");
const passport = require("passport");
const dbController = require("./databaseController.js");

const meta = {
	messages: {all:[]},
	user: undefined
}

dbController.start();

module.exports = {
	getREQs:function(app){

		// Get Request Handlers
		app.get("/laststand", function(req, res){
			res.render("laststand", meta);
		});

		app.get("/messaging", function(req, res){
			res.render("messaging", meta);
		});

		app.get("/myprofile", function(req, res){
			res.render("profile", meta);
		});

		app.get("/login", function(req, res){
			res.render("login", meta);
		});

		app.get("/:var(games)?", function(req, res){
			res.render("games", meta);
		});

		app.get('/login/google', passport.authenticate('google', {
			scope: 'https://www.googleapis.com/auth/plus.login'
		})
	);

		app.get('/login/google/return', passport.authenticate('google', { failureRedirect: '/login' }),
  		function(req, res) {
    		res.redirect('/');
  	});

		app.get('/profile', require('connect-ensure-login').ensureLoggedIn(),
  		function(req, res){
    		res.render('profile', { user: req.user });
		});
	},
	postREQs:function(app){
		// Post Rquest Handlers
		app.post("/laststand", function(req, res){
			res.send(JSON.stringify(req.body));
		});

		app.post("/messaging", function(req, res){
			res.send(JSON.stringify(req.body));
			if (req.body.message.length > 1) {
				meta.messages.all.push([req.body.user, ,": ", req.body.message].join(""));
				console.log("SERVER SAYS".red.whiteBG, "new message from: ", req.body.user, ": ", req.body.message);
				dbController.saveMsg({
					user: req.body.user,
					message: req.body.message,
					date: Date.now(),
					seen: true
				});
			}
			else {
				console.log("no new message".magenta.greenBG, meta.messages.all);
			}
		});

		app.post("/login", function(req, res){
			res.send(JSON.stringify(req.body));
			console.log(req.body);
			if(req.body.loggedIn === "true") {
				meta.user = "Guest";
			}
			else if(req.body.loggedIn === "false") {
			console.log(req.body);
				meta.user = undefined;
			}
		});
	}
};
