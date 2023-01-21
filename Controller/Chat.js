const mqtt =require('mqtt');

exports.publish=(req,res,next)=>{


    const topic="testTopic";
    //connection 
    const publisher=mqtt.connect('mqtt://127.0.0.1:1883');
    
    publisher.on("connect",()=>{
      console.log("publisher connected !!");
    });
    
    //publish
    publisher.publish(topic, "test message")
    console.log("sent ..");


}
