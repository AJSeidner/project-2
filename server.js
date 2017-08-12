var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config/connection.js");
 
var app = express();
var port = process.env.PORT || 3000;
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"));


 var routes = require("./controllers/html-routes.js");
 var managerRoutes=require("./controllers/manager-routes.js");
 var salespersonRoutes = require("./controllers/salesperson-routes.js");
 var api= require("./controllers/api-routes.js");

app.use("/",routes);
app.use("/managers",managerRoutes);
app.use("/seller",salespersonRoutes);
app.use("/",api);

app.listen(port,function(err){
	
	console.log("listening to port : "+ port);
})