var mysql= require("mysql");

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Slipknot@14",
	database:"inventory_db"
});

connection.connect(function(err){

	if(err) { 
		console.log("error connection: " + err.stack);
		return;
	}
	console.log ("Connected as id : " + connection.threadId);
});

module.exports = connection;

