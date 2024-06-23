const express = require("express");
const questionRouter = express.Router();
const {
	question,
	selectquestion,
	selectsinglequestion,
	selectansawer,
} = require("../controller/questionController");
questionRouter.post("/askquestion", question);
questionRouter.get("/selectquestion", selectquestion);
questionRouter.get("/selectsinglequestion", selectsinglequestion);
questionRouter.get("/selectansawer", selectansawer);

module.exports = questionRouter;
