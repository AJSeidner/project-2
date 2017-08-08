var connection = require("../config/connection.js");
var express = require("express");
var router = express.Router();
var bodyParser=require("body-parser");

//TODO
// route: / 
// display homepage
router.get("/",function(request,response){

		response.send("this is the homepage");
});


//TODO
// route: /login 
// display login page
router.get("/login",function(request,response){

	response.render("login");
});



//TODO
// route: /login 
// post login info - check credentials

router.post("/login",function(request,response){
	var userName=request.body.username;
	var password=request.body.password;

	connection.query("select * from employees",function(err,result){
		for (var i=0 ; i<result.length ; i++){
			if(userName === result[i].email){
				if(password===result[i].password)
				{
					console.log("ID match " + userName);
					response.redirect("/"+userName);
				}

			else{
				console.log("wrong password");
			}

				
			}
			else{
				console.log("Id doesn't match");
			}
			
		}
	})
})

// if credential is correct route to salerperson or manager's homepage
//credeintial is wrong route to failure login 


//TODO
// route: /failed to log in 
// display page to alert user log in failed.

module.exports = router;