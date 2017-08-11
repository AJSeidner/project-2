var orm = require("./config/orm.js");

orm.all("employees",function(data){
    console.log("Test ORM ALL ");
    console.log(data);
});

orm.create("inventory_line",["employeeId","inventoryId","qty","txnType"],[1,1,5,"s"],function(data){
     console.log("Test ORM CREATE ");
    console.log(data);
});

orm.update("inventory",{stock_qty:5},"id = 2",function(data){
     console.log("Test ORM UPDATE ");
    console.log(data);
});

orm.findWhere("employees",{id:1},function(data){
     console.log("Test ORM FINDWHERE ");
    console.log(data);
});

orm.innerJoin("inventory","inventory_line","id","employeeId",function(data){
    console.log("Test ORM LEFTJOIN ");
    console.log(data);
});

orm.select(["email","password"],"employees",function(data){
    console.log("Test ORM SELECT ");
    console.log(data)
});