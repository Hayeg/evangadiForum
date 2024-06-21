const express = require("express");
const answerRouter = express.Router();
const { answerQuestion } = require("../Controller/answerController");
answerRouter.post("/answerQuestion", answerQuestion);
module.exports = answerRouter;
