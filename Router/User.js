const express = require("express");
const Router = express.Router();
const { getUserById ,updateUser} = require("../Controller/User");

Router.route("/:id").get(getUserById);
Router.route("/:id").put(updateUser);

module.exports = Router;
