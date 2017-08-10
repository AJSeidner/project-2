var employee=require("../models/employee.js");
var inventory=require("../models/inventory.js");
var inventoryLine=require("../models/inventoryLine.js");

//--------------------employee model test--------------------------------
employee.all(function(result){
    console.log("employee");
    console.log(result);
});

employee.create(["fname","lname","role","email","password","regionCode"],["Morpheus","Smith","s","test@test.com","smith","W"],function(result){
    console.log("create");
    console.log(result);

});
//change update value to test
employee.update({regionCode:'W'},"id=4",function(data){
    console.log("update");
    console.log(data);
});

employee.findWhere({email:"test@test.com"},function(data){
    console.log("findWhere");
    console.log(data)
});

employee.innerJoin("inventory","id","id",function(data){
    console.log("innerJoin");
    console.log(data);
});

employee.select(["fname","email"],function(data){
    console.log("select");
    console.log(data);
});
// ----------------------------------------------------------------------

// ----------------------Inventory model tests---------------------------
inventory.all(function(result){
    console.log("Inventory");
    console.log(result);
});

inventory.create(["product_name","stock_qty","unit_price","regionCode","category"],["teapot",55,12.50,"E","kitchen"],function(result){
    console.log("create");
    console.log(result);

});
//change the update value to test
inventory.update({regionCode:'W'},"id=24",function(data){
    console.log("update");
    console.log(data);
});

inventory.findWhere({product_name:"teapot"},function(data){
    console.log("findWhere");
    console.log(data)
});

inventory.innerJoin("inventory_line","id","inventoryId",function(data){
    console.log("innerJoin");
    console.log(data);
});

inventory.select(["product_name","unit_price"],function(data){
    console.log("select");
    console.log(data);
});
//------------------------------------------------------------------------

//---------------------inventoryLine model tests -------------------------

inventoryLine.all(function(result){
    console.log("Inventory");
    console.log(result);
});

inventoryLine.create(["employeeId","inventoryId","qty","txnType","price_cost"],[1,2,2,"s",10.50],function(result){
    console.log("create");
    console.log(result);

});
//change update value to test
inventoryLine.update({txnType:'p'},"id=1",function(data){
    console.log("update");
    console.log(data);
});

inventoryLine.findWhere({inventoryId:2},function(data){
    console.log("findWhere");
    console.log(data)
});

inventoryLine.innerJoin("employees","employeeId","id",function(data){
    console.log("innerJoin");
    console.log(data);
});

inventoryLine.select(["qty","txnType"],function(data){
    console.log("select");
    console.log(data);
});