const mqtt = require('mqtt');
exports.createClient=(req,res)=>
{
  const {id}=req.body;
  var {client} = mqtt.connect("mqtt://127.0.0.1:1883", { clientId: id });
  res.status(200).send({message:"client created", data: JSON.parse(client)});
  console.log("connected flag  " + client.connected);
  return client;
}

exports.publish=(req,res)=>
{
  const {topic,msg,client} = req.body;
  console.log("publishing", msg);
  if (client.connected == true) {
      client.publish(topic, msg, options);
      client.end();
   res.status(200).json({msg:"message sent",data:msg});
  }
  else
  {
    client.end();
    res.status(200).json({msg:"message not sent client not connected",data:null});
  }
  
}

exports.listen=(req,res)=>
{
 const {client}= req.body;
    client.on('message',function(topic, message, packet){
        res.status(200).json({msg:"recieved message",data:{topic:topic,msg:message}});
        console.log("message is "+ message);
        console.log("topic is "+ topic);
    });
}

exports.connect=(req,res)=> 
{
    const {client}=req.body;
    client.on("connect", function(){
        console.log("connected  " + client.connected);
        res.status(200).json({msg:"client connected successfully ",data:null});
    });
}

exports.subscribe=(req,res)=>
{
   const {client,topics}=req.body;
  client.subscribe(topics);
  res.status(200).json({msg:" subscribed to topics",data:topics});
}
