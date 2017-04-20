const fs = require("fs");

module.exports = function(app) {
	
	// Get Request Handlers
	app.get("/laststand", function(req, res){
		res.render("laststand");
	});
	
	app.get("/messaging", function(req, res){
		res.render("messaging");
	});
	
	app.get("/", function(req, res){
		fs.createReadStream("404.html").pipe(res);
	});
	
	// Post Rquest Handlers
	app.post("/laststand", function(req, res){
		res.send(JSON.stringify(req.body));
		console.log(req.body.data);
	});
	
	app.post("/messaging", function(req, res){
		res.send(JSON.stringify(req.body));
		console.log(req.body.data);
	});

};