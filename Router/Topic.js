const Router= require('express').Router();
const {create,getAll,getMessages} =require('../Controller/Topic');

Router.route('/').post(create);
Router.route('/').get(getAll);
Router.route('/messages/:id').get(getMessages);



module.exports = Router;