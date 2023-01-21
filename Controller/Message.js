const Message = require('../Models/Message');
const {CreateMessageValidation} = require('./validation');
const Topic = require('../Models/Topic');



// create Message
exports.create= async (req,res,next)=>{
    const {error}= await CreateMessageValidation(req.body);
    if(error)
    {
        console.log({message:error.details[0].message});
        res.status(500).send({message:"failed error :"+error,data:null});
    }

    const message = new Message(req.body);
    try {
        const savedMessage = await message.save();
        if(savedMessage)
        {
            Topic.findOneAndUpdate(
                { _id: req.body.topic },
                { $push: { messages: savedMessage._id } },
                (error, topic) => {
                  if (topic) {
                    res.status(200).json({
                      message: "message added pushed in Topic ..  ",
                      data: topic,
                    });
                  } else {
                    res.status(500).json({
                      message: "message not pushed in Topic.. ",
                      data: null,
                    });
                  }
                }
              ); 
        }
    } catch (error) {
        res.status(201).send({
            message:"error:"+error,
            data:null,
    })
}
}
