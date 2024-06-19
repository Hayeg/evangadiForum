// const connection = require("../db/dbConfig");
// const bcrypt = require("bcrypt");
// const { StatusCodes } = require("http-status-codes");
// const jwt = require("jsonwebtoken");
// // register function
// async function register(req, res) {
// 	const { username, firstname, lastname, email, password } = req.body;
// 	if (!username || !firstname || !lastname || !email || !password) {
// 		return res
// 			.status(StatusCodes.BAD_REQUEST)
// 			.json({ msg: "Please fill all the fields" });
// 	}
// 	try {
// 		//select
// 		const [user] = await connection.query(
// 			"SELECT username , userid from users WHERE username = ? or email = ?",
// 			[username, email]
// 		);
// 		//catch if user already exist
// 		if (user.length > 0) {
// 			return res
// 				.status(StatusCodes.BAD_REQUEST)
// 				.json({ msg: "Username or Email already exists" });
// 		}
// 		// catch passwords that are < 8
// 		if (password.length <= 8) {
// 			return res
// 				.status(StatusCodes.BAD_REQUEST)
// 				.json({ msg: "password should be at least 8 characters" });
// 		}
// 		//hash password (hide user's password)
// 		const salt = await bcrypt.genSalt(10);
// 		const hashedPassword = await bcrypt.hash(password, salt);
// 		await connection.query(
// 			"INSERT INTO users (username, firstname, lastname, email, password) VALUES (?,?,?,?,?) ",
// 			[username, firstname, lastname, email, hashedPassword]
// 		);
// 		return res
// 			.status(StatusCodes.CREATED)
// 			.json({ msg: "User registered successfully" });
// 	} catch (error) {
// 		console.log(error.msg);
// 		return res
// 			.status(StatusCodes.INTERNAL_SERVER_ERROR)
// 			.json({ msg: "something went wrong. please try again." });
// 	}
// }

// // login function
// // async function login(req, res) {
// // 	const { email, password } = req.body;
// // 	console.log(email)
// // 	if (!email || !password) {
// // 		return res
// // 			.status(StatusCodes.BAD_REQUEST)
// // 			.json({ msg: "Please fill all the fields" });
// // 	}
// // 	try {
// // 		//select
// // 		const [user] = await connection.query(
// // 			"SELECT username , userid, password from users WHERE  email = ?",
// // 			[email]
// // 		);
// // 		if (user.length === 0) {
// // 			return res
// // 				.status(StatusCodes.BAD_REQUEST)
// // 				.json({ msg: "incorrect email" });
// // 		}
// // 		// compare actual password and hash password
// // 		const isMatch = await bcrypt.compare(password, user[0].password);
// // 		if (!isMatch) {
// // 			return res
// // 				.status(StatusCodes.BAD_REQUEST)
// // 				.json({ msg: "incorrect password" });
// // 		}
// // 		//generate token (give access if the password and the email is correct)
// // 		const username = user[0].username;
// // 		const userid = user[0].userid;
// // 		const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
// // 			expiresIn: "1d",
// // 		});

// //         return res.status(StatusCodes.OK).json({msg:"user login successfully", token, username})
// // 	} catch (error) {
// // 		return res
// // 			.status(StatusCodes.INTERNAL_SERVER_ERROR)
// // 			.json({ msg: "something went wrong. please try again." });
// // 	}
// // }
// async function login(req, res) {
// 	const { email, password } = req.body;
// 	console.log(email);

// 	if (!email || !password) {
// 		return res
// 			.status(StatusCodes.BAD_REQUEST)
// 			.json({ msg: "Please fill all the fields" });
// 	}

// 	try {
// 		// Select user from the database
// 		const [rows] = await connection.query(
// 			"SELECT username, userid, password FROM users WHERE email = ?",
// 			[email]
// 		);

// 		if (rows.length === 0) {
// 			return res
// 				.status(StatusCodes.BAD_REQUEST)
// 				.json({ msg: "Incorrect email" });
// 		}

// 		const user = rows[0];

// 		// Compare actual password and hashed password
// 		const isMatch = await bcrypt.compare(password, user.password);

// 		if (!isMatch) {
// 			return res
// 				.status(StatusCodes.BAD_REQUEST)
// 				.json({ msg: "Incorrect password" });
// 		}

// 		// Generate token
// 		const token = jwt.sign(
// 			{ username: user.username, userid: user.userid },
// 			process.env.JWT_SECRET,
// 			{
// 				expiresIn: "1d",
// 			}
// 		);

// 		return res
// 			.status(StatusCodes.OK)
// 			.json({ msg: "User login successfully", token, username: user.username });
// 	} catch (error) {
// 		console.error(error);
// 		return res
// 			.status(StatusCodes.INTERNAL_SERVER_ERROR)
// 			.json({ msg: "Something went wrong. Please try again." });
// 	}
// }

// // check user function
// async function checkUser(req, res) {
// 	const username = req.user.username
// 		const userid = req.user.userid;
// 	res.status(StatusCodes.OK).json({ msg: "valid user", username, userid});
// }
// module.exports = {
// 	register,
// 	login,
// 	checkUser,
// };

const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes"); //HTTP Status Codes​​ Access the status codes you need, with the protocol being used


async function register(req, res) {
	console.log(req.body)
	const { username, firstname, lastname, email, password } = req.body;
	if (!username || !firstname || !lastname || !email || !password) {
		console.log("1")
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "All fields are required" });
	}
	try {
		//using array destructuring to get the first element of the array returned by the dbconnection.query method.
		// the query method returns an array where the first element is the result set (an array of rows) and the second element is metadata about the query.
		//index[0]
		const [user] = await dbconnection.query(
			"SELECT userid,username from users WHERE username = ? or email = ?",
			[username, email]
		);
		// return res.json({userinformation:user})
		if (user.length > 0) {
									console.log("2");
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "user already registered" });

		}
		if (password.length <= 8) {
									console.log("3");

			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Password must be at least 8 characters long" });
		}
		// Best Practice
		const saltRounds = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		await dbconnection.query(
			"INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
			[username, firstname, lastname, email, hashedPassword]
		);

		// Send a success response
		res
			.status(StatusCodes.CREATED)
			.json({ message: "User registered successfully" });
	} catch (error) {
		// // Handle errors
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong. Please try again later." });
	}
}

async function login(req, res) {
	const { email, password } = req.body;
	if (!email || !password) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ message: "All fields are required" });
	}
	try {
		const [user] = await dbconnection.query(
			"SELECT userid,username,password from users WHERE email=?",
			[email]
		);
		// return res.json({ user: user });

		if (user.length == 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Invalid credentials" });
		}
		// compare the actual password with decrypted one
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Invalid credentialsp " });
		}

		// JWTs are often used for authentication. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. This token can be stored in local storage or cookies on the client side.
		// assign Toke for user
		// Payload: The data you want to include in the token (e.g., user information).
		// Secret or Private Key: The key used to sign the token for ensuring its integrity.
		// Options: Optional settings like the algorithm, expiration time, issuer, etc.

		// Define the payload
		const username = user[0].username;
		const userid = user[0].userid;
		// Define the secret key
		const secret = process.env.JWT_SECRET;
		// Define options
		const options = { expiresIn: "1d" };
		// Create the token
		const token = jwt.sign({ username, userid }, secret, options);

		return res
			.status(StatusCodes.OK)
			.json({ message: "User Logged In", token, username });
	} catch (error) {
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ msg: "Something went wrong. Please try again later." });
	}
}
async function checkUser(req, res) {
	const username = req.user.username;
	const userid = req.user.userid;

	res
		.status(StatusCodes.OK)
		.json({ message: "valid useres", username, userid });
}
module.exports = { register, login, checkUser };
