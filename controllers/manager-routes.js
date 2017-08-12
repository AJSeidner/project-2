var connection = require("../config/connection.js");
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var inventory = require("../models/inventory.js")
var inventoryline=require("../models/inventoryLine.js");
var employee=require("../models/employee.js");


//TODO
// route: /manager
// display homepage for the manager (assume just one manager)


//TODO
// route: /view inventory
// display all inventory info regardless of region code
// nice to have: sort by region, sort by category

router.get("/allinventory",function(request,response){
	inventory.all(function(result){
		response.render("allinventory",{products:result})
	});
	
});


//TODO
// route: /view all sold items
// display all sold items regardless of region code
// nice to have: sort by region, sort by category

router.get("/allsold",function(request,response){

	//console.log(request);
	inventoryline.innerJoin("inventory","inventoryId","id",function(data){
			var soldItems = data.filter(e => e.txnType === "s");
  response.render("allsold",{products:soldItems});
});




});


//TODO
// route: /view items are low in stock
// display all items that are low in stock (display all items that has stock qty < 15)
// nice to have: sort by region, sort by category, allow manager to set low stock threshold
router.get("/lowstock",function(request,response){
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
// route: /add more stock to an item
// post - update inventory item with added stock qty
// get a route name it addstock 
// display all the inventory
// post route (/addstock)with update method then put a form that has a name and stock quantity that they would like to add
// grab the values and compare the name with the inventory column if it matches 
// create a variable so you can add the numbers of stock 
// update the database with the new  stock quantity
// give a message alerting that the data has been updated
	
router.get("/addstock",function(request,response){
	inventory.all(function(result){
		//console.log(result);
		response.render("addstock",{products:result})
	});
});

router.put("/addstock",function(request,response){
	var productName = request.body.product_name;
	var stockQuantity =parseInt(request.body.stock_quantity); 
	var purchaseCost = parseInt(request.body.purchase_cost);




	inventory.findWhere({product_name:productName},function(result){
		var dbstock = parseInt(result[0].stock_qty);
		var updatedstock= dbstock + stockQuantity;
		updatedstock=updatedstock.toString();
		var totalcost = stockQuantity* purchaseCost;

		//add one entry to Inventory Line when adding more stock to an item
		//hardcoded manager's employeeId, need to change it later
		//TODO: Need to make sure manager ID is correct when deploy to HEROKU
		inventoryline.create(["employeeId","inventoryId","qty","txnType","price_cost"],[3,result[0].id,stockQuantity,"s",totalcost],function(data){
			console.log(data);
		});

		console.log(updatedstock);
		var condition=" id = "+ result[0].id;
		 console.log("condition: ", condition);
		 inventory.update({stock_qty:updatedstock}, condition , function(data){

				response.redirect("/managers/addstock"); 
		 });
		

	})

	


})


//TODO
// route: /transfer stock for an item from one region to another
// ask user how many stock to transfer and from where to where
// post - update inventory item with above info
//nice to have: only allow transfer when an item is available in both regions(currently we have east and west region) 

router.get("/transferstock",function(request,response){
	response.render("transferstock");
})

router.put("/transferstock",function(request,response){

	var productName = request.body.product_name;	
	var region = request.body.regionCode;
	var quantity = parseInt(request.body.quantity);
	console.log("quantity transferrer"+quantity);
	inventory.findWhere({product_name:productName},function(result){
			for(var i=0 ; i<result.length;i++)
			{
				if(result[i].regionCode === region)
				{
					var total= result[i].stock_qty - quantity;
					console.log("Transffered from = " +result[i].stock_qty);
					console.log("total= "+total);
					var condition=" id = "+ result[i].id;
				 console.log("condition: ", condition);
				 inventory.update({stock_qty:total}, condition , function(data){	
						// response.redirect("/managers/transferstock"); 
		 });
					
				}
		}
		var tranToName=request.body.name;
		var tranToRegion = request.body.toRegionCode;

		inventory.findWhere({product_name:tranToName},function(result){
			for(var i=0 ; i<result.length ; i++)
			{
				if(result[i].regionCode === tranToRegion)
				{
						var total= result[i].stock_qty + quantity;
					console.log("Transferred to = "+ result[i].stock_qty);
					console.log("Total= "+total)
					var condition=" id = "+ result[i].id;
					 console.log("condition: ", condition);
					 inventory.update({stock_qty:total}, condition , function(data){	
						
		 });

				}
			}

		})

	})
		response.redirect("/managers/transferstock"); 
})
	



//TODO
// route: /add new product
// get: dispaly add new product form , post - add new entry to inventory table
// nice to have: form validation check - does not allow form to submit when the require field is not filled out

router.get("/addproduct",function(request,response){
	response.render("newproduct");
})

router.post("/addproduct",function(request,response){
	var productName = request.body.product_name;
	var stockQuantity = parseInt(request.body.stock_quantity);
	var unitPrice = request.body.unit_price;
	var regionCode= request.body.regionCode;
	var category = request.body.category;
	var purchaseCost = parseFloat(request.body.purchase_cost);
	var totalcost = stockQuantity* purchaseCost;

	inventory.create(["product_name","stock_qty","unit_price","regionCode","category"],[productName,stockQuantity,unitPrice,regionCode,category],function(data){
		console.log(data.insertId);
		inventoryline.create(["employeeId","inventoryId","qty","txnType","price_cost"],[3,data.insertId,stockQuantity,"p",totalcost],function(data){
	 		
	 	});
		response.redirect("/managers/addstock");
	})

})



//TODO
// route: /add a new salesperson
// get: dispaly add new salesperson form , post - add new entry to employee table
// nice to have: form validation check - does not allow form to submit when the require field is not filled out

router.get("/addsalesperson",function(request,response){
	response.render("newsalesperson");
})

router.post("/addsalesperson",function(request,response){
	var salesFirstName = request.body.salesperson_fname;
	var salesLastName = request.body.salesperson_lname;
	var salesEmail = request.body.salesperson_email;
	var salesRegionCode= request.body.salesperson_regionCode;
	var salesRole = "seller";
	var salespersonPassword= request.body.salesperson_password;
 	
	console.log(salesFirstName,salesLastName,salesEmail,salesRole,salesRegionCode,salespersonPassword)

	 employee.create(["fname","lname","role","email","password","regionCode"],[salesFirstName,salesLastName,salesRole,salesEmail,salespersonPassword,salesRegionCode],function(data){
	 	console.log("added successfully");
	 })
})





module.exports=router;