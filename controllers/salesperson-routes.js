var connection = require("../config/connection.js");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var inventory = require("../models/inventory.js")
var inventoryline=require("../models/inventoryLine.js");
var employee=require("../models/employee.js");

//TODO
// route: /:salerperson's name
// display homepage for that salesperson
	

//TODO
// route: /view inventory
// display all inventory belong to that salseperson - based on the region code
// nice to have:  add sort by category to veiw inventory
// create a get route for the person's name/inventory
		
		router.get("/:name/inventory",function(request,response){
			var salespersonName=request.params.name;
			var region = "";
			employee.findWhere({fname:salespersonName},function(result){
				region = result[0].regionCode;
				inventory.findWhere({regionCode:region},function(data){

						response.render("salesinventory",{products:data})
				})

			})
			
		});

//TODO
// route: /view all sold items
// display all sold items belong to that salseperson
// nice to have:  add sort by category 
	router.get("/:name/allsold", function(request,response)
{		inventoryline.innerJoin("inventory","inventoryId","id",function(data){
			var soldItems = data.filter(e => e.txnType === "s");
			console.log(soldItems);
    response.render("sellerallsold",{products:soldItems});
});
	
	})

//TODO
// route: /report which item is sold and how many in qty
// post the item id and qty sold - add an entry to solditem table, update the stock qty in the inventory table
	
module.exports=router;