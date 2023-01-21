const express = require("express");
const Router = express.Router();

const { login, register} = require("../Controller/Auth");

Router.route("/register").post(register);
Router.route("/login").post(login);


module.exports = Router;
