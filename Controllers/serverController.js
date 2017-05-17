const fs = require("fs");
const passport = require("passport");
const dbController = require("./databaseController.js");

const meta = {
	messages: {all:[]},
	user: undefined
}

dbController.start();

module.exports = {
	getREQs: (app) => {

		// Get Request Handlers
		app.get("/laststand", (req, res) => {
			res.render("laststand");
		});

		app.get("/messaging", (req, res) => {
			console.log(res.locals.user);
			res.locals.messages = meta.messages
			res.render("messaging");
		});

		app.get("/login", (req, res) => {
			res.render("login");
		});

		app.get("/games", (req, res) => {
			res.render("games");
		});

		app.get('/login/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login'}
		));

		app.get('/login/google/return', passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/profile' }),
  		(req, res) => {
    		res.redirect('/profile');
  	});

		app.get('/profile', require('connect-ensure-login').ensureLoggedIn(),
  		(req, res) => {
				console.log(res.locals.user);
				res.locals.user = req.user.displayName;
    		res.render('login');
		});

		app.get("/", (req, res) =>{
			res.render("games");
		});

		app.get("/:var*[a-z]*[A-Z]?", (req, res) => {
			res.redirect("/");
		});

	},
	postREQs: (app) => {
		// Post Rquest Handlers
		app.post("/laststand", (req, res) => {
			res.send(JSON.stringify(req.body));
		});

		app.post("/messaging", (req, res) => {
			res.send(JSON.stringify(req.body));
			if (req.body.message.length > 1) {
				meta.messages.all.push([req.body.user, ,": ", req.body.message].join(""));
				console.log("SERVER SAYS".red.whiteBG, "new message from: ", req.body.user, ": ", req.body.message, req.session.id);
				dbController.saveMsg({
					user: req.body.user,
					message: req.body.message,
					date: Date.now(),
					seen: true,
					sessid: req.session.id
				});
			}
			else {
				console.log("no new message".magenta.greenBG, meta.messages.all);
			}
		});

		app.post("/login", (req, res) => {
			if(req.body.loggedIn === "true") {
				res.redirect("/login");
			}
			else if(req.body.loggedIn === "false") {
				res.send(JSON.stringify(req.body));
			}
		});
	}
};
