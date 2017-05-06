const mongoose = require("mongoose");

// Set up Schema
const Schema = mongoose.Schema;

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

module.exports = {
  start:function(uri) {
  	// connect to mongo database
    mongoose.connect(uri);

    let db = mongoose.connection;

  	db.once('open', function() {
  		// we're connected!
  		console.log("Connected to message database.".blue.whiteBG);
  	}).on('error', console.error.bind(console, 'connection error:'.red));

  },
  save:function(obj){
    let temp = new Message({
      user:obj.user,
      message:obj.message,
      date:Date.now(),
      seen:obj.seen
    });
    temp.save(function(err, temp){
      if(err) return console.error(err);
      console.log(temp);
    });
  }
};
