var mysql = require("mysql");


//for heroku deployment
if(process.env.JAWSDB_URL){
    connection=mysql.createConnection(process.env.JAWSDB_URL);
}
else{
    connection=mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"MartinD-28",
    database: "inventory_db"
    })

}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;