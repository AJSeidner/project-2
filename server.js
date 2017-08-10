
var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config/connection.js");
var routes = require("./controllers/html-routes.js");
var app = express();
var port = 3000;
var exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
	
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/",routes);


app.listen(port,function(err){
	
	console.log("listening to port : "+ port);
})

