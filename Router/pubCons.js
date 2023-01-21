const Router = require("express").Router();
const { subscribe, publish } = require("../Controller/pubCons");


Router.route("/publisher").post(publish );
Router.route("/consummer").post( subscribe);

module.exports = Router;
