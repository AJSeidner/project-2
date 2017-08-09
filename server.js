var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config/connection.js");
  var routes = require("./controllers/html-routes.js");
 var managerRoutes=require("./controllers/manager-routes.js");
var app = express();
var port = 3000;
var exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
	
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
 app.use("/",routes);
 app.use("/managers",managerRoutes);
//require("./controllers/html-routes.js") (app);
// require("./controllers/manager-routes.js")(app);


app.listen(port,function(err){
	
	console.log("listening to port : "+ port);
})

