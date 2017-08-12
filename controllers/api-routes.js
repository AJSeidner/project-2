//requrie express and its route
var express = require("express");
var router = express.Router();


var employee = require("../models/employee.js");
var inventory = require("../models/inventory.js");
var inventoryLine = require("../models/inventoryLine.js");


//Get all items in Inventory 
router.get("/api/allInventory", function (req, res) {
    inventory.all(function (data) {

        console.log("get all inventory: " + data);
        res.json(data);
    });
});

//Get all sold items in inventoryLine
router.get("/api/allSoldItems", function (req, res) {
    inventoryLine.all(function (data) {
        var soldItems = data.filter(e => e.txnType === 's');
        console.log("get all inventory line: " + soldItems);
        res.json(soldItems);
    });
});

//Get all purchased items(add in more stock/or add new product) in inventoryLine
router.get("/api/allPurchaseItems", function (req, res) {
    inventoryLine.all(function (data) {
        var moreItems = data.filter(e => e.txnType === 'p');
        console.log("get all inventory line: " + moreItems);
        res.json(moreItems);
    });
});

function getAllSoldItemInLastMonth(data, dtNow, dtLM) {
    //get all sold items between today to last month's date
    var soldItemsLM = data.filter(e => e.createdAt <= dtNow && e.createdAt > dtLM)
        .filter(e => e.txnType === "s");

    //console.log("get all inventory line: " + soldItemsLM);
    return soldItemsLM;

}

function daysInInventory(totalStock, numSold) {
    return totalStock / numSold;
}

//calculate number days in inventory per item
function getNumDaysInInventory(input, cb) {
    var numDays = [];
    var dtNow = new Date();
    var dtLM = new Date();
    dtLM.setMonth(dtLM.getMonth() - 1);
    dtLM.setDate(dtLM.getDate());
    console.log("last month: " + dtLM);
    input.forEach(function (item, index) {
        var currInventoryId = item.inventoryId;
        console.log("current inventory Id: " + currInventoryId);
        var inventoryLines = input.filter(e => e.inventoryId === currInventoryId);
        //console.log("return inventory lines for a specific inventoryId:"+JSON.stringify(inventoryLines));
        var soldItems = getAllSoldItemInLastMonth(inventoryLines, dtNow, dtLM);
        //console.log("return sold item:"+ JSON.stringify(soldItems));

        //as long as there are sold items for a specific inventoryId
        if (soldItems.length > 0) {
            //get Day difference 
            var datediff = Math.abs(dtNow.getTime() - dtLM.getTime()); // difference 
            var daysInMonth = parseInt(datediff / (24 * 60 * 60 * 1000), 10);
            //console.log("day difference: " + daysInMonth);

            var totalSoldQty = soldItems.map(a => a.qty)
                .reduce(function (a, b) { return a + b; });
            //console.log("total sold qty: " + totalSoldQty);

            var numSoldPerDay = totalSoldQty / daysInMonth;

            inventory.select(["id", "stock_qty", "product_name"], function (data) {
                var currItem = data.filter(e => e.id === currInventoryId);
                //console.log("current stock for this item: " + JSON.stringify(currItem));
                console.log("current product name: " + currItem[0].product_name);
                inventory.findWhere({ product_name: currItem[0].product_name }, function (result) {

                    //console.log("if there more product: " + JSON.stringify(result));

                    totalStock = result.map(a => a.stock_qty).reduce(function (a, b) { return a + b; });

                    //console.log("total qty : " + totalStock);
                    //return totalStock;

                    var daysIn = daysInInventory(totalStock, numSoldPerDay);

                    numDays.push({ product_name: currItem[0].product_name, daysInInventory: daysIn });
                    // console.log("index:"+index);
                    // console.log(numDays);
                    // console.log(input.length);
                    if (index === input.length - 1) {
                        cb(numDays);
                    }
                });
            });

        }

    });

}

router.get("/api/daysInInventory", function (req, res) {
    inventoryLine.all(function (data) {
        var numDays = [];

        getNumDaysInInventory(data, function (result) {

            //reduce duplicates
            var inventoryDays = result.filter((item, index, self) => self.findIndex(t => t.product_name === item.product_name) === index);

            //console.log(inventoryDays);
            res.json(inventoryDays);
        });

    });
});




function addDaysInInventoryArr(result, product, region, numDays) {
    var hasItemId = result.findIndex(e => e.product === product);
    console.log("hasItemId in the result array: "+ hasItemId);

    if (hasItemId !== -1) {
        addDaysInInventoryByRegion(result[hasItemId].daysInInventory, region, numDays);
    }
    else {
        result.push({ product: product, daysInInventory: {west:0,east:0} });
        
       // console.log("current result:"+ JSON.stringify(result));
        //console.log("current result length:"+ result.length);
        //console.log("HERE!!! "+typeof result[result.length-1].daysInInventory);
        addDaysInInventoryByRegion(result[result.length-1].daysInInventory, region, numDays);
    }

}

function addDaysInInventoryByRegion(item, region, num) {
    region = region.toLowerCase();
    
    if (region === 'w' || region === 'west') {
        item.west = num;
    }
    else {
        item.east = num;
    }
}

router.get("/api/daysInInventory2", function (req, res) {
    var daysInInventoryArr = [];
    var dtNow = new Date();
    var dtLM = new Date();
    dtLM.setMonth(dtLM.getMonth() - 1);
    dtLM.setDate(dtLM.getDate());
    console.log("last month: " + dtLM);
    var datediff = Math.abs(dtNow.getTime() - dtLM.getTime()); // difference 
    var daysInMonth = parseInt(datediff / (24 * 60 * 60 * 1000), 10);

    inventory.LeftJoinInventoryLine(function (data) {
        //get solditems from last month to today
       // var soldItems = data.filter(e => e.createdAt <= dtNow && e.createdAt > dtLM);
       // res.json(data.filter((item, index, self) => self.findIndex(t => t.product_name === item.product_name) === index));
         res.json(data.filter((item, index, self) => self.findIndex(t => t.product_name === item.product_name) === index));

        // data.forEach(function (item, index) {
        //     //console.log("current item: " + JSON.stringify(item));
        //     console.log(index+"current employeeId:"+ item.employeeId);
        //     if (!item.employeeId) {
        //         //when inventory_line return employeeId null, meaning this item has not sold in the last month

        //         numDays = item.stock_qty;
        //         console.log("no sold: current item: "+ item.product_name+" numdays:"+ numDays+ " region:"+ item.regionCode);
        //         addDaysInInventoryArr(daysInInventoryArr, item.product_name, item.regionCode, numDays);
        //     }
        //     else if(item.createdAt <= dtNow && item.createdAt > dtLM){

        //         numSold = item.qty / daysInMonth;
        //         numDays = item.stock_qty / numSold;
        //         console.log("sold: current item: "+ item.product_name+" numdays:"+ numDays+ " region:"+ item.regionCode);
        //         addDaysInInventoryArr(daysInInventoryArr, item.product_name, item.regionCode, numDays);

        //     }
        //     if (index === data.length - 1) {
        //         res.json(daysInInventoryArr);
        //     }

        // });

    })

});

router.get("/api/daysInInventory3", function (req, res){

    var daysInInventoryArr = [];
    var dtNow = new Date();
    var dtLM = new Date();
    dtLM.setMonth(dtLM.getMonth() - 1);
    dtLM.setDate(dtLM.getDate());
    console.log("last month: " + dtLM);
    var datediff = Math.abs(dtNow.getTime() - dtLM.getTime()); // difference 
    var daysInMonth = parseInt(datediff / (24 * 60 * 60 * 1000), 10);


    inventory.all(function(allItems){
        
        allItems.forEach(function (item, index) {
            inventoryLine.findWhere({inventoryId:item.id},function(lineItems){
                //all item sold for that product within the last 30 days
                var soldItems=lineItems.filter(e=>e.txnType === "s").filter(e=>e.createdAt <= dtNow && e.createdAt  > dtLM);
                console.log("current item: "+ item.product_name);
                console.log("current region: "+ item.regionCode);
                console.log("currnet item stock: "+ item.stock_qty);
                console.log("related sold txn lines from last month: "+ JSON.stringify(soldItems));
                

                if(soldItems.length > 0)
                    {
                        //calculate total sold qty within the last 30 days
                        var totalSoldQty = soldItems.map(a => a.qty)
                            .reduce(function (a, b) { return a + b; });//reduce() act as sum function

                        console.log("Total sold qty: "+ totalSoldQty);
                        var numSoldPerDay=totalSoldQty/daysInMonth;
                        var numDays=item.stock_qty/numSoldPerDay;
                        addDaysInInventoryArr(daysInInventoryArr, item.product_name, item.regionCode, numDays);
                        //console.log("current daysIn result: "+ JSON.stringify(daysInInventoryArr));
                        
                    }
                else
                    {
                        console.log("no sold qty within last 30 days");
                        var numDays=item.stock_qty*365;
                        addDaysInInventoryArr(daysInInventoryArr, item.product_name, item.regionCode, numDays);

                    }

                console.log("====================================================");
                if(index===allItems.length-1)
                    {
                        res.json(daysInInventoryArr);
                    }
            });
            
        });

    });

});

function addDataMarginArr(result, product, region, margin,marginP) {
    var hasItemId = result.findIndex(e => e.product === product);
    console.log("hasItemId in the result array: "+ hasItemId);

    if (hasItemId !== -1) {
        addMarginValByRegion(result[hasItemId]["grossMargin"], region, margin);
        addMarginValByRegion(result[hasItemId]["marginPercent"], region, marginP);
    }
    else {
        result.push({ product: product, grossMargin: {west:0,east:0}, marginPercent:{west:0,east:0} });
        
       // console.log("current result:"+ JSON.stringify(result));
        //console.log("current result length:"+ result.length);
        //console.log("HERE!!! "+typeof result[result.length-1].daysInInventory);
        addMarginValByRegion(result[result.length-1]["grossMargin"], region, margin);
        addMarginValByRegion(result[result.length-1]["marginPercent"], region, marginP);
    }

}

function addMarginValByRegion(item, region, num) {
    region = region.toLowerCase();
    
    if (region === 'w' || region === 'west') {
        item.west = num;
    }
    else {
        item.east = num;
    }
}

router.get("/api/marginMetric",function(req,res){
//     margin= price - cost (per unit)
// margin % = margin/ cost (per unit)
    var marginArr=[];

    inventory.all(function(allItems){
    
        allItems.forEach(function(item, index){
            inventoryLine.findWhere({inventoryId:item.id},function(lineItems){
                var totalSoldPrice=0;
                var totalPurchaseCost=0;
                var totalSoldQty=0;
                var totalPurchasedQty=0;
                var soldItems=lineItems.filter(e=>e.txnType ==="s");
                if(soldItems.length>0)
                {
                    totalSoldQty = soldItems.map(a => a.qty)
                            .reduce(function (a, b) { return a + b; });
                    totalSoldPrice=soldItems.map(e=>e.price_cost).reduce((a,b)=>a+b);
                }
                var purchasedItems=lineItems.filter(e=>e.txnType==="p");
                if(purchasedItems.length>0)
                {
                     totalPurchasedQty=purchasedItems.map(a => a.qty)
                            .reduce(function (a, b) { return a + b; });
                     totalPurchaseCost= purchasedItems.map(e=>e.price_cost).reduce((a,b)=>a+b);
                }
                console.log("current item: "+ item.product_name);
                console.log("current item txn: "+ JSON.stringify(lineItems));
                console.log("sold price: "+ totalSoldPrice+ " sold qty: "+totalSoldQty);
                console.log("purchase cost: "+ totalPurchaseCost+ " purchased qty: "+totalPurchasedQty);
                if(totalPurchasedQty >0 && totalSoldQty > 0)
                {
                    var margin=(totalSoldPrice/totalSoldQty)-(totalPurchaseCost/totalPurchasedQty);
                    var marginPercent= margin/(totalPurchaseCost/totalPurchasedQty)*100;
                    console.log("margin: "+ margin);
                    console.log("margin%:"+ marginPercent);
                    addDataMarginArr(marginArr,item.product_name,item.regionCode,margin,marginPercent);
                }
                else
                {
                    console.log("no margin");
                    addDataMarginArr(marginArr,item.product_name,item.regionCode,0,0);
                }
                

                console.log("====================================================");
                if(index===allItems.length-1)
                    {
                        res.json(marginArr);
                    }

            });
        })
    });

});

module.exports = router;