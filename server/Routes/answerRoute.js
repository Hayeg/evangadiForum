const express = require("express");
const answerRouter = express.Router();
const { answerQuestion } = require("../controller/answerController");
answerRouter.post("/answerQuestion", answerQuestion);
module.exports = answerRouter;
