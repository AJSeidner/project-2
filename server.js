<<<<<<< HEAD
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');



var app = express();
var PORT = process.env.PORT || 3000;

//var db = require("./models");
//Serve static content for the app from the "public" directory in the application directory.
app.use(methodOverride("_method"));
app.use(express.static("public"));



//Express set up to handle data-parsing
=======
var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config/connection.js");
  var routes = require("./controllers/html-routes.js");
 var managerRoutes=require("./controllers/manager-routes.js");
var app = express();
var port = 3000;
var exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({ extended: false }));
>>>>>>> 36f4e18725cebb2e472a2cc63e3ff1fde52d6b2f
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
<<<<<<< HEAD




// Handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


require("./controllers/_api-routes.js")(app);
require("./controllers/_html-routes.js")(app);
require("./controllers/_manager-routes.js")(app);
require("./controllers/_salesperson-routes.js")(app);



db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
=======
	
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
 app.use("/",routes);
 app.use("/managers",managerRoutes);
//require("./controllers/html-routes.js") (app);
// require("./controllers/manager-routes.js")(app);


app.listen(port,function(err){
	
	console.log("listening to port : "+ port);
})

>>>>>>> 36f4e18725cebb2e472a2cc63e3ff1fde52d6b2f
