var orm = require("../config/orm.js");

var inventory = {
    all: function (cb) {
        orm.all("inventory", function (data) {
            cb(data);
        });
    },
    //cols - in array fomrat, the cols needed for insert 
    //vals - in array format
    create: function (cols, vals, cb) {
        orm.create("inventory", cols, vals, function (data) {
            cb(data);
        });
    },
    //objColVals - in this format {col:val, col2:val2}
    //cond - in string format whereCol= whereVal
    update: function (objColVals, cond, cb) {
        orm.update("inventory", objColVals, cond, function (data) {
            cb(data);
        });
    },
    //objColVals - in this format {col:val, col2:val2}
    findWhere: function (objColVals, cb) {
        orm.findWhere("inventory", objColVals, function (data) {
            cb(data);
        });
    },

    //t1col - is the column from employees
    //t2col - is the column from table2 input
    innerJoin: function (table2, t1col, t2col, cb) {
        orm.innerJoin("inventory", table2, t1col, t2col, function (data) {
            cb(data);
        });
    },
    //cols - in array format
    select: function (cols, cb) {
        orm.select(cols, "inventory", function (data) {
            cb(data);
        });
    }



}

module.exports = inventory;