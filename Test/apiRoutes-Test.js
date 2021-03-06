var express = require("express");
var bodyParser = require("body-parser");

var port = 3000;
var app = express();


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Import routes and give the server access to them.
var api = require("../controllers/api-routes.js");

app.use("/", api);

app.listen(port);
