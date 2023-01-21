const Encadreur = require("../Models/Encadreur");
const Etudiant = require("../Models/Etudiant");
const Topic = require("../Models/Topic");
const { CreateMessageValidation } = require("./validation");

// create Topic
exports.create = async (req, res, next) => {
  // const {error}= await CreateMessageValidation(req.body);
  // if(error)
  // {
  //     console.log({message:error.details[0].message});
  //     res.status(500).send({message:"failed error :"+error,dat:null});
  // }

  const topic = new Topic({
    name: req.body.name,
    profEncadrant: req.body.profEncadrant,
    messages: req.body.messages,
    etudiants: req.body.etudiants,
  });

console.log("donnnnnnnnnnnnnnnnnne!2")

  try {
    const savedTopic = await topic.save();
    if (savedTopic) {
      Encadreur.findOneAndUpdate(
        { _id: req.body.profEncadrant },
        { $push: { topics: savedTopic._id } },
        (error, encadreur) => {
          if (Encadreur) {
            req.body.etudiants.map((etudiant)=>{
              Etudiant.findOneAndUpdate(
                { _id: etudiant},
                { $push: { topics: savedTopic._id }},
                (error, etudiant)=>{
                  if(etudiant)
                  {
                    console.log("added to student");
                  }
                  else
                  {
                    console.log("error adding topi to student ",error)
                  }
                })
            })
            res.status(200).send({message: "topic added to students and encadrant:",data:{encadreur:encadreur,etudiants:req.body.etudiants}})
          }
          else if (error)
          {
            res.status(500).send({message: "error adding topic to encadrant :",error})
          }
        
        }
      );
    }
  } catch (error) {
    res.status(201).send({
      message: "error:" + error,
      data: null,
    });
  }
};


//get All Topics

exports.getAll = (req, res) => {
  Topic.find({})
    .then((topics) => {
      if (topics.length <= 0) {
        res.status(500).json({
          message: "there is no topics in system ..",
          data: "null",
        });
      } else {
        res.status(200).json({
          message: "topics in system",
          data: topics,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "error " + err,
      });
    });
};

exports.getMessages = (req, res) => {
  const topic = Topic.findById({ _id: req.params.id })
    .populate({
      path: "messages",
      populate: {
        path: "sender",
      },
    })
    .then((topic) => {
      console.log("777777777777777777777777");
      if (topic) {
        console.log("777777777777777777777777");
        res.status(200).json({
          message: "topic messages",
          data: topic.messages,
        });
      } else {
        res.status(500).json({
          message: "topic not found",
          data: topic,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "error :" + err.response.data.message,
        data: null,
      });
    });
};
