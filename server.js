var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config/connection.js");
<<<<<<< HEAD
  var routes = require("./controllers/html-routes.js");
 var managerRoutes=require("./controllers/manager-routes.js");
 var salespersonRoutes = require("./controllers/salesperson-routes.js");
 var apiRoutes= require("./controllers/api-routes");
=======
 
>>>>>>> 1a5c7ea45743814c5a5c08547a10cfa392fd6b3c
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
<<<<<<< HEAD
app.use("/",apiRoutes);

	
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
 app.use("/",routes);
 app.use("/managers",managerRoutes);
//require("./controllers/html-routes.js") (app);
// require("./controllers/manager-routes.js")(app);

=======
app.use("/",api);
>>>>>>> 1a5c7ea45743814c5a5c08547a10cfa392fd6b3c

app.listen(port,function(err){
	
	console.log("listening to port : "+ port);
})