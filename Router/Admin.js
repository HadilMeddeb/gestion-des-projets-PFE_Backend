const Router = require("express").Router();
const { create } = require("../Controller/Admin");

Router.route("/").post(create);

module.exports = Router;
