const Router= require('express').Router();
const {publish,createClient,listen,connect,subscribe} =require('../Controller/publishSubscribe');

Router.route('/publish').post(publish);
Router.route('/subscribe').post(subscribe);
Router.route('/connect').post(connect);
Router.route('/listen').post(listen);
Router.route('/createClient').post(createClient);


module.exports = Router;
