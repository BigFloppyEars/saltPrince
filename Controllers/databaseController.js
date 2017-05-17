const mongoose = require("mongoose");
const nconf = require("nconf");

// encrypt database url and connect
nconf.argv().env().file('keys.json');
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}

// Set up Schema
const Schema = mongoose.Schema;

const messageSchema = Schema({
  user: String,
  body: String,
  date: {type: Date, default: Date.now},
  seen: Boolean,
  sessid: String
});

let Message = mongoose.model("Message", messageSchema);

module.exports = {
  start: (url = uri) => {
  	// connect to mongo database
    mongoose.connect(url);

    let db = mongoose.connection;

  	db.once('open', () => {
  		// we're connected!
  		console.log("Connected to message database.".blue.whiteBG);
  	}).on('error', console.error.bind(console, 'connection error:'.red));

  },
  saveMsg: (obj) => {
    console.log("DATABASE SAYS".green.whiteBG, obj);
    let now = Date.now();
    let temp = new Message({
      user:obj.user,
      body:obj.message,
      seen:obj.seen,
      date:now,
      sessid:obj.sessid
    });
    temp.save((err, temp) => {
      if(err) return console.error(err);
      console.log(temp);
    });
  }
};
