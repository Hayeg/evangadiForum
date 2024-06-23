require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;
const cors = require("cors");
app.use(cors());
const dbconnection = require("./db/dbConfig");
const userRoutes = require("./Routes/userRoute");
const askqueastionroutes = require("./Routes/questionRoute");
const answerquestions = require("./Routes/answerRoute");

app.use(express.json()); 

app.use("/api/users", userRoutes);
app.use("/api/question", askqueastionroutes);
app.use("/api/answer", answerquestions);
app.get("/",(req, res)=>{
	res.send("Welcome to our API");
})
async function start() {
	try {
		const [rows] = await dbconnection.execute("SELECT 'test' AS result");
		app.listen(port, () => {
			console.log(`Listening on port ${port}`);
		});
	} catch (error) {
		console.error("Failed to establish database connection:", error.message);
	}

}

start();
