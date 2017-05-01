const fs = require("fs");

const meta = {
	messages: {all:[]},
	user: undefined
}

module.exports = function(app) {
	
	// Get Request Handlers
	app.get("/laststand", function(req, res){
		res.render("laststand", meta);
	});
	
	app.get("/messaging", function(req, res){
		console.log(req.user);
		res.render("messaging", meta);
	});
	
	app.get("/myprofile", function(req, res){
		res.render("profile", meta);
	});
	
	app.get("/login", function(req, res){
		res.render("login", meta);
	});
	
	app.get("/logout", function(req, res){
		res.render("logout", meta);
	});
	
	app.get("/", function(req, res){
		fs.createReadStream("404.html").pipe(res);
	});
	
	// Post Rquest Handlers
	app.post("/laststand", function(req, res){
		res.send(JSON.stringify(req.body));
		console.log(req.data);
	});
	
	app.post("/messaging", function(req, res){
		res.send(JSON.stringify(req.body));
		req.body.message.length > 1 ? meta.messages.all.push(req.body.message) : console.log(meta.messages.all);
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

};
