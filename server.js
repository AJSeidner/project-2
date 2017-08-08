var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');



var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");
//Serve static content for the app from the "public" directory in the application directory.
app.use(methodOverride("_method"));
app.use(express.static("public"));



//Express set up to handle data-parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));




// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


var router = require("./controllers/burgers_controller.js");
app.use("/", router);

console.log(req.body.burger_name);

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});