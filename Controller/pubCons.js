const mqtt = require("mqtt");

// create consummer and get Connected to the Topic
exports.subscribe = (req, res, next) => {
  const topic = req.body.topic;
  //creation consummer
  const consummer = mqtt.connect("mqtt://127.0.0.1:1883");
  consummer.on("connect", () => {
    console.log("connected");
  });

  consummer.subscribe(topic, { qos: 1 }, () => {
    console.log("client has subscribed successfully");
  });

  consummer.on("message", function (topic, message) {
    console.log("message is " + message);
    console.log("topic is " + topic);
    res.status(201).json({ tmessage: message });
  });
};

//creation publisher
exports.publish = (req, res, next) => {
  const topic = req.topic;
  const message=req.message;
  //connection
  const publisher = mqtt.connect("mqtt://127.0.0.1:1883");

  publisher.on("connect", () => {
    console.log("publisher connected !!");
  });

  //publish
  publisher.publish(topic, message);
  console.log("sent ..");
  res.status(201).json({ tmessage: "message" });
};
