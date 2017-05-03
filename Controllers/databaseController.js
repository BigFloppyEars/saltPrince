const nconf = require("nconf");
const mongoose = require("mongoose");

// Set up Schema
const Schema = mongoose.Schema;

module.exports = function(app) {
  nconf.argv().env().file('keys.json');

// Connect to a MongoDB server provisioned over at
// MongoLab.  See the README for more info.

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

// [START client]
let uri = `mongodb://${user}:${pass}@${host}:${port}`;

if (nconf.get('mongoDatabase')) {
  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}

console.log(uri);

mongodb.MongoClient.connect(uri, (err, db) => {
  if (err) {
    throw err;
  }
  console.log(db);
});
	// connect to mongo database
//	mongoose.connect("mongodb://localhost/saltPrince");

//	let db = mongoose.connection;

/*
	db.once('open', function() {
		// we're connected!
		console.log("Connected to message database.".blue.whiteBG);
	}).on('error', console.error.bind(console, 'connection error:'));
*/

	const messageSchema = Schema({
		user: String,
		body: String,
		date: {type: Date, default: Date.now},
		seen: Boolean
	});

	let Message = mongoose.model("Message", messageSchema);

	let thisMessage = new Message({
									user:"Colibaba",
									body:"Does this work?",
									date:Date.now(),
									seen:false
	});

	thisMessage.save(function(err, thisMessage){
		if(err) return console.error(err);
		console.log(thisMessage);
	});
	
};
