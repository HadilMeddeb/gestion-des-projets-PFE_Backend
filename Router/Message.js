const Router= require('express').Router();
const {create} =require('../Controller/Message');
const { isAuth } = require('../middleware/auth');

Router.route('/').post(create);


module.exports = Router;