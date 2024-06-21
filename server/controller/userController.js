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
		
		const [user] = await dbconnection.query(
			"SELECT userid,username from users WHERE username = ? or email = ?",
			[username, email]
		);
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
		const saltRounds = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		await dbconnection.query(
			"INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
			[username, firstname, lastname, email, hashedPassword]
		);

		res
			.status(StatusCodes.CREATED)
			.json({ message: "User registered successfully" });
	} catch (error) {
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

		if (user.length == 0) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Invalid credentials" });
		}
		const isMatch = await bcrypt.compare(password, user[0].password);
		if (!isMatch) {
			return res
				.status(StatusCodes.BAD_REQUEST)
				.json({ message: "Invalid credentialsp " });
		}
		const username = user[0].username;
		const userid = user[0].userid;
		const secret = process.env.JWT_SECRET;
		const options = { expiresIn: "1d" };
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
