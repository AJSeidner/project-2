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
	// a route to sell inventory
router.get("/:name/sellinventory",function(request,response){
	var salespersonName=request.params.name;
		employee.innerJoin("inventory","regionCode","regionCode",function(result){
			var soldItems = result.filter(e => e.fname === salespersonName);

			//console.log(soldItems);
			response.render("sellinventory",{products:soldItems});
		})
		
		
	

});

router.put("/:name/sellinventory",function(request,response){
	var productName=request.body.product;
	var employeenName = request.params.name;
	var quantity=parseInt(request.body.quantity);
	var dbstock= parseInt(request.body.stock_qty);
	var totalstock=dbstock-quantity;
	console.log(totalstock);


	employee.findWhere({fname:employeenName},function(result){
		condition= " product_name=\""+productName+"\" and regionCode=\""+result[0].regionCode+"\"";
		inventory.update({stock_qty:totalstock},condition,function(data){
		response.redirect("/seller/"+employeenName+"/sellinventory");
	})
	})
	
	
})
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

	router.get("/:name/lowstock",function(request,response){
	inventory.all(function(result){
		var lowstockArr=[];
		for (var i=0 ; i<result.length ; i++)
		{
		if(result[i].stock_qty < 60 )
			{
				lowstockArr.push(result[i]);
			}
		}
		console.log(lowstockArr);
		response.render("lowstock",{products:lowstockArr});
	})
	
})

//TODO
// route: /report which item is sold and how many in qty
// post the item id and qty sold - add an entry to solditem table, update the stock qty in the inventory table
	
module.exports=router;