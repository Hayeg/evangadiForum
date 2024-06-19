
// // const express = require("express");
// // const questionRouter = express.Router();
// // const {
// // 	question,
// // 	selectquestion,
// // 	selectsinglequestion,
// // 	selectansawer,
// // } = require("../Controller/questionController");
// // questionRouter.post("/askquestion", question);
// // questionRouter.get("/selectquestion", selectquestion);
// // questionRouter.get(
// // 	"/selectsinglequestion",
// // 	selectsinglequestion
// // );
// // questionRouter.get("/selectansawer", selectansawer);

// // module.exports = questionRouter;
// const express = require("express");
// const questionRouter = express.Router();
// const {
// 	question,
// 	selectquestion,
// 	selectsinglequestion,
// 	selectansawer,
// } = require("../controller/questionController");

// // Apply the authMiddleWare to routes that require authentication
// questionRouter.post("/askquestion", question);
// questionRouter.get("/selectquestion", selectquestion);
// questionRouter.get("/selectsinglequestion", selectsinglequestion);
// questionRouter.get("/selectansawer",  selectansawer);

// module.exports = questionRouter;


const express = require("express");
// organize and manage routes in a modular and efficient manner
const questionRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
	question,
	selectquestion,
	selectsinglequestion,
	selectansawer,
} = require("../Controller/questionController");
questionRouter.post("/askquestion", question);
questionRouter.get("/selectquestion", selectquestion);
questionRouter.get("/selectsinglequestion", selectsinglequestion);
questionRouter.get("/selectansawer", selectansawer);

module.exports = questionRouter;
