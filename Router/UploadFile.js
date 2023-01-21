const Router= require('express').Router();
const {upload} =require('../Controller/FileUpload');

Router.route('/').post(upload);



module.exports = Router;