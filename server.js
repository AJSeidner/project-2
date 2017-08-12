var express=require("express");
var md=require("method-override");
var bp=require("body-parser");
var ephb=require("express-handlebars");

var app=express();
//for heroku deployment
var port = process.env.PORT || 4000;


app.use(express.static("public"));
app.use(bp.urlencoded({extended:false}));

app.use(md("_method"));

app.engine("handlebars",ephb({defaultLayout:"main"}));
app.set("view engine","handlebars");

// Sets up the Express app to handle data parsing
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(bp.text());
app.use(bp.json({ type: "application/vnd.api+json" }));

// Import routes and give the server access to them.
var routes = require("./controllers/api-routes.js");
app.use("/", routes);



app.listen(port,function(err){
	
	console.log("listening to port : "+ port);
})

