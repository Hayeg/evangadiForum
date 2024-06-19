const mysql2 = require("mysql2");
require("dotenv").config();

const dbconnection = mysql2.createPool({
	host: "localhost",
	user: process.env.MYUSER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", //path to mysql sock in MAMP
});

console.log(process.env.MYUSER);
console.log(process.env.PASSWORD);
console.log(process.env.DATABASE);

dbconnection.execute("SELECT 'test' AS result", (err, result) => {
	if (err) {
		console.log("Error connecting to the database:", err.message);
	} else {
		console.log("Database connection test result:", result);
	}
});

module.exports = dbconnection.promise();
