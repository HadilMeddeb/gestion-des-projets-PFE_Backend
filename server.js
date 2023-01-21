require("dotenv").config({ path: "./config/config.env" });
const connect = require("./config/db.js");
const express = require("express");
const authRoute = require("./Router/Auth");
const UserRoute = require("./Router/User");
const AdminRoute = require("./Router/Admin");
const EncadreurRoute = require("./Router/Encadreur");
const EtudiantRoute = require("./Router/Etudiant");
const MessageRoute = require("./Router/Message");
const ProjetPFERoute = require("./Router/ProjetPFE");
const TopicRoute = require("./Router/Topic");
const PubConsRoute = require("./Router/pubCons");
const UploadFileRoute = require("./Router/UploadFile");
const PublishSubscribe= require('./Router/publisherSubscriber');
const ReponseRoute= require('./Router/Reponse');
const TaskRoute= require('./Router/Task');
const mqtt = require("mqtt");
const morgan = require('morgan');
const cors = require("cors");
const fileUpload= require('express-fileupload')
const server = express();
const PORT = process.env.PORT || 3000;

//connexion a la base  de donnee
connect();

//middleware
server.use(fileUpload({
  createParentPath: true
}));
server.use(express.json());
server.use(cors());
server.use(morgan('dev'));
// server.use(fileUpload);

//route middleware
server.use("/api/user", authRoute);
server.use("/api/user", UserRoute);
server.use("/api/admin", AdminRoute);
server.use("/api/encadreur", EncadreurRoute);
server.use("/api/etudiant", EtudiantRoute);
server.use("/api/messages", MessageRoute);
server.use("/api/projetpfe", ProjetPFERoute);
server.use("/api/topic", TopicRoute);
server.use("/api/pubCons", PubConsRoute);
server.use("/api/upload",UploadFileRoute);
server.use("/api/publishSubscribe",PublishSubscribe);
server.use("/api/task",TaskRoute);
server.use("/api/reponse",ReponseRoute);



// -----------------------------------------------publish----------------------------//
server.post("/publish", (req, res, next) => {
  const message = req.body.message;
  const topic = req.body.topic;
  
  //connection au mosquitto broker
  const publisher = mqtt.connect("mqtt://127.0.0.1:1883");

  publisher.on("connect", () => {
    console.log("publisher connected !!");
  });

  //publish message to topic sent from front 
  publisher.publish(topic, message);
  console.log("sent ..");
});



// -----------------------------------------------subscribe----------------------------//
server.post("/subscribe", (req, res, next) => {
  const {topic} = req.body;
  console.log(topic);

  // consummer connection to the broker
  const consummer = mqtt.connect("mqtt://127.0.0.1:1883");
  consummer.on("connect", () => {
    console.log("connected");
  });
  

  // consummer subscribe to topic
  consummer.subscribe(topic, { qos: 1 }, () => {
    console.log("client has subscribed successfully",topic);
  });

  // the consummer will gonna keep listening to the topic
  consummer.on("message", function (topic, msg) {
    console.log(msg);
    res.status(201).send({message:"here is the resulted message",data:msg});
    console.log("message is " + message.toString());
    console.log("topic is " + topic);
  });
});




//running server
server.listen(PORT, () => {
  console.log("server is listening on port ", PORT);
});
