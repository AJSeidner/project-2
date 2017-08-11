//requrie express and its route
var express = require("express");
var router = express.Router();


var employee=require("../models/employee.js");
var inventory=require("../models/inventory.js");
var inventoryLine=require("../models/inventoryLine.js");



//Get all items in Inventory 
router.get("/api/allInventory",function(req, res){
    inventory.all(function(data){

        console.log("get all inventory: "+ data);
        res.json(data);
    });
});

//Get all sold items in inventoryLine
router.get("/api/allSoldItems",function(req,res){
    inventoryLine.all(function(data){
        var soldItems=data.filter(e => e.txnType === 's');
        console.log("get all inventory line: "+ soldItems);
        res.json(soldItems);
    });
});

//Get all purchased items(add in more stock/or add new product) in inventoryLine
router.get("/api/allSoldItems",function(req,res){
    inventoryLine.all(function(data){
        var moreItems=data.filter(e => e.txnType === 'p');
        console.log("get all inventory line: "+ moreItems);
        res.json(moreItems);
    });
});

module.exports=router;