const express = require("express");
const Router = express.Router();
const {create} = require ("../Controller/Task");

Router.route("/").post(create);


module.exports = Router;