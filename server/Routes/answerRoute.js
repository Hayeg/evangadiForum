// // const express = require("express");
// // const router = express.Router();
// // router.get("/answers", (req, res) => {
// // 	res.send({ message: "answer questions" });
// // });
// // module.exports = router;

// const express = require("express");
// const answerRouter = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const { answerQuestion } = require("../controller/answerController");
// answerRouter.post("/answerQuestion", answerQuestion);
// module.exports = answerRouter;
const express = require("express");
const answerRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { answerQuestion } = require("../Controller/answerController");
answerRouter.post("/answerQuestion", answerQuestion);
module.exports = answerRouter;
