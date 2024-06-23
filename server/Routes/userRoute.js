const express = require("express");
const Router = express.Router();
const authMiddleware = require("../middleWare/authMiddleWare");
const { register, login, checkUser } = require("../controller/userController");
Router.post("/register", register);
Router.post("/login", login);
Router.get("/check", authMiddleware, checkUser); 

module.exports = Router;
