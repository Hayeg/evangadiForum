const mysql2 = require("mysql2");
require("dotenv").config();

const dbconnection = mysql2.createPool({
	host: process.env.DBHOST,
	user: process.env.MYUSER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});
console.log("DBHOST:", process.env.DBHOST);
console.log("MYUSER:", process.env.MYUSER);
console.log("DATABASE:", process.env.DATABASE);
console.log("PASSWORD:", process.env.PASSWORD);

dbconnection.execute("SELECT 'test' AS result", (err, result) => {
	if (err) {
		console.error(err);
	}else{
		console.log("Connected to database");
	}
	
});

module.exports = dbconnection.promise();
