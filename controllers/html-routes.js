var connection = require("../config/connection.js");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
//TODO
// route: / 
// display homepage


router.get("/", function(request, response) {
	response.send("this is the homepage");
});
//TODO
// route: /login 
// display login page
router.get("/login", function(request, response) {
	response.render("login");
});
//TODO
// route: /login 
// post login info - check credentials
router.post("/login", function(request, response) {
	var userName = request.body.username;
	var password = request.body.password;
	connection.query("select * from employees where email = ?", [userName], function(err, result) {
		console.log(result[0].role);
		if (result.length === 0) {
			response.redirect("failedlogin");
		}
		if (result.length > 0) {
			if (result[0].password === password) {
				if (result[0].role === "Manager") {
					response.redirect("/manager/" + result[0].fname)
				} else {
					response.redirect("/seller/" + result[0].fname)
				}
			} else {
				response.redirect("failedlogin");
			}
		}
	})
})
router.get("/manager/:name", function(request, response) {
	response.render("manager", {
		fname: request.params.name
	})
});
router.get("/seller/:name", function(request, response) {
	response.render("seller", {
		fname: request.params.name
	})
});
router.get("/failedlogin", function(request, response) {
	response.render("failedlogin");
});


// if credential is correct route to salerperson or manager's homepage
//credeintial is wrong route to failure login 
//TODO
// route: /failed to log in 
// display page to alert user log in failed.
module.exports=router;