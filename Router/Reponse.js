const express = require("express");
const Router = express.Router();
const {create} = require ("../Controller/Reponse");
Router.route("/").post(create);


module.exports = Router;




























module.exports = Router;
