// const express = require("express");
// const router = express.Router();


// const authMiddleWare = require("../middleware/authMiddleware");
// // user controller
// const { register, login, checkUser } = require("../controller/userController");

// // register user
// router.post("/register", register);

// // login user
// router.post("/login", login);

// // check user
// router.get("/check", authMiddleWare, checkUser);

// module.exports = router;
const express = require("express");
const Router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

//user controller

const { register, login, checkUser } = require("../Controller/userController");
//register route
Router.post("/register", register);
Router.post("/login", login);
Router.get("/check", authMiddleware, checkUser); // pass througn authMiddleware for authorization

module.exports = Router;
