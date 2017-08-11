
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');



var app = express();
var PORT = process.env.PORT || 3000;


var connection = require("./config/connection.js");
  var routes = require("./controllers/html-routes.js");
 var managerRoutes=require("./controllers/manager-routes.js");
var app = express();
var port = 3000;
var exphbs = require("express-handlebars");
//var db = require("./models");
//Serve static content for the app from the "public" directory in the application directory.
app.use(methodOverride("_method"));
app.use(express.static("public"));





var connection = require("./config/connection.js");
  var routes = require("./controllers/html-routes.js");

var exphbs = require("express-handlebars");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));




// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");





app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
 app.use("/",routes);
 app.use("/managers",managerRoutes);
//require("./controllers/html-routes.js") (app);
// require("./controllers/manager-routes.js")(app);


app.listen(port,function(err){
	
	console.log("listening to port : "+ port);
})
