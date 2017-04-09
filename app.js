const express = require("express");

const app = express();

app.get("/", function(req, res){
  res.status(200).send("TESTING!!!");
});

app.listen(process.env.PORT || 8080);

console.log("Server Running");
