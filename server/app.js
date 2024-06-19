// require("dotenv").config();
// const express = require("express");
// const app = express();
// const PORT = 5500;
// const cors = require("cors");
// app.use(cors());
// const connection = require("./db/dbConfig");
// // user router middleware file
// const userRoutes = require("./routes/userRoute");
// // auth middleware
// // const authMiddleWare = require("./middleWare/authMiddleWare");
// //json middleware to extract json data
// app.use(express.json());
// const askqueastionroutes = require("./routes/questionRoute");
// const answerquestions = require("./routes/answerRoute");
// app.use("/api/question", askqueastionroutes); //question route middleware
// app.use("/api/answer",  answerquestions); //answer route middleware
// // user router middleware
// app.use("/api/users", userRoutes);
// async function start() {
// 	try {
// 		const result = await connection.execute("select 'test' ");
// 		await app.listen(PORT);
// 		console.log("database connection established");
// 		console.log(`Server is running on port ${PORT}`);
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// }
// start();


require("dotenv").config();

const express = require("express");
const app = express();
const port = 5500;
const cors = require("cors");
app.use(cors());
const dbconnection = require("./db/dbConfig");
//user routes middleware file
const userRoutes = require("./Routes/userRoute");
const askqueastionroutes = require("./Routes/questionRoute");
const answerquestions = require("./Routes/answerRoute");

app.use(express.json()); // any request pass througn this JSON middleware

app.use("/api/users", userRoutes); //user route middleware
app.use("/api/question", askqueastionroutes); //question route middleware
app.use("/api/answer", answerquestions); //answer route middleware
//
//
//
//
//
async function start() {
  try {
    const result = await dbconnection.execute("select 'test'");
    await app.listen(port);
    console.log("database connection established");
    console.log(`listneing on port ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
// app.listen(port, (err) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(`listneing port ${port}`);
//   }
// });
