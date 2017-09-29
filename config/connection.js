var mysql = require("mysql");

<<<<<<< HEAD
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Slipknot@14",
	database:"inventory_db"
});
=======

//for heroku deployment
if(process.env.JAWSDB_URL){
    connection=mysql.createConnection(process.env.JAWSDB_URL);
}
else{
    connection=mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"test",
    database: "inventory_db"
    })

}
>>>>>>> 1a5c7ea45743814c5a5c08547a10cfa392fd6b3c

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;