const fs = require("fs");

module.exports = function(app) {
	
	app.get("/laststand", function(req, res){
		res.render("laststand");
	});
	
	app.post("/laststand", function(req, res){
		res.send(JSON.stringify(req.body));
		console.log(req.body.data);
	});
	
	app.get("/", function(req, res){
		fs.createReadStream("404.html").pipe(res);
	});

};