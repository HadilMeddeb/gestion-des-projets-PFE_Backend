const Router= require('express').Router();
const {create,deleteProject,getProjectById,pushInFiles,deleteFile,getAll} =require('../Controller/ProjetPFE');

Router.route('/').post(create);
Router.route('/:id').get(getProjectById);
Router.route('/:id').delete(deleteProject);
Router.route('/:id/pushFile').put(pushInFiles);
Router.route('/removeFile').put(deleteFile);
Router.route('/').get(getAll);
module.exports = Router;

