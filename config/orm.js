// Import MySQL connection.
var connection = require("../config/connection.js");

//Code from in class activity
// Helper function for SQL syntax.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}


var orm = {
    all: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });

    },

    findWhere: function (tableInput, objColVals, cb) {
        var queryString = "SELECT * FROM " + tableInput + " WHERE " + objToSql(objColVals);

        console.log(queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },

    innerJoin: function (table1, table2, t1col,t2col, cb) {
        var queryString= "SELECT * FROM "+ table1 + " as t1"
                        + " INNER JOIN "+ table2 + " as t2"
                        +  " ON t1.?? = t2.??";

        console.log("IN inner join: "+queryString);
        connection.query(queryString,[t1col,t2col], function(err,result){
            if(err){
                throw err;
            }

            cb(result);

        });

    },
    select: function (whatToSelect, tableInput, cb) {
        var queryString = "SELECT " + whatToSelect.toString() + " FROM " + tableInput;
        console.log("IN select: "+queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};


module.exports = orm;
