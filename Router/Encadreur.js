const Router = require("express").Router();
const { create, getAll,getAllProjects ,deleteEnseignant,updateEnseignant,getAllTopics} = require("../Controller/Encadreur");


Router.route("/").post(create);
Router.route("/").get( getAll);
Router.route("/getallprojects/:id").get( getAllProjects);
Router.route("/getalltopics/:id").get( getAllTopics);
Router.route('/:id').delete(deleteEnseignant);
Router.route('/:id').put(updateEnseignant);
module.exports = Router;
