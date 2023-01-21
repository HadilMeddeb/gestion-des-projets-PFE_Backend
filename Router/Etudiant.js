const Router= require('express').Router();
const {create,
    getAll,
    deleteEtudiant,
    updateEtudiant,
    getById,
    AddCompetance,
    AddSkill,
    AddFormation,
    AddExperience,
    AddSocialMediaLink,
    getAllTopics} =require('../Controller/Etudiant');


Router.route('/').post(create);
Router.route('/').get(getAll);
Router.route('/:id').delete(deleteEtudiant);
Router.route('/:id').put(updateEtudiant);
Router.route('/:id').get(getById);
Router.route('/competances/:id').put(AddCompetance);
Router.route('/skills/:id').put(AddSkill);
Router.route('/formations/:id').put(AddFormation);
Router.route('/experiences/:id').put(AddExperience);
Router.route("/getalltopics/:id").get( getAllTopics);
// Router.route('/socialMediaLinks/:id').put(AddSocialMediaLink);


module.exports = Router;