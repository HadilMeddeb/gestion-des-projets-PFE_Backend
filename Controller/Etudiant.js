const Etudiant = require("../Models/Etudiant");
const { CreateEtudiantValidation } = require("../Controller/validation");

// create Etudiant
exports.create = async (req, res, next) => {
  const { error } = await CreateEtudiantValidation(req.body);
  console.log("validation error = ");
  if (error) {
    console.log({ message: error.details[0].message });
    return res.status(500).send({ message: error.details[0].message ,data:null});
  }

  //checking if the Etudiant is already in the database
  const emailExist = await Etudiant.findOne({ email: req.body.email });

  if (emailExist)
    return res.status(500).send({ message: "email already exist" ,data:null});

  // hash passwords
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hashSync(Math.random().toString(36).slice(-8), salt);

  //create a new Etudiant
  const etudiant = new Etudiant(req.body);

  try {
    const savedEtudiant = await etudiant.save();
    res.status(201).send({
      message: "success",
      data: savedEtudiant,
    });
  } catch (err) {
    res.status(500).send({
      message: " registration failed" + err,
      data: null,
    });
  }
};

exports.getAll = (req, res) => {
  Etudiant.find({})
    .then((etudiants) => {
      if (etudiants.length <= 0) {
        res.status(500).json({
          message: "there is no students in system ..",
          data: "null",
        });
      } else {
        res.status(200).json({
          message: "students in system",
          data: etudiants,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "error " + err,
      });
    });
};

exports.deleteEtudiant = (req, res) => {
  console.log(req.params.id);

  Etudiant.findByIdAndDelete({ _id: req.params.id }, (err, etudiant) => {
    if (err) {
      res.status(500).json({
        message: "error etudiant not  deleted" + err,
        data: null,
      });
    } else {
      res.status(201).json({
        message: "etudiant deleted successfully",
        data: etudiant,
      });
    }
  });
};


exports.updateEtudiant = (req, res) => {

  Etudiant.findOneAndUpdate({ _id: req.params.id }, req.body, (err,etudiant) => {
    if (err) {
      res.status(500).json({
        message: "error Etudiant not  updated" + err,
        data: null,
      });
    } else {
      res.status(201).json({
        message: "Etudiant updated successfully  hebelt offfffffffffffffff",
        data: etudiant,
      });
    }
  });
};


exports.getById=(req,res)=>{
 
  Etudiant.findOne({_id:req.params.id},(err,etudiant)=>{
    if (err) {
      res.status(500).json({
        message: "error Etudiant not  found" + err,
        data: null,
      });
    } else {
      res.status(201).json({
        message: "Etudiant found successfully",
        data: etudiant,
      });
    }
  });

}


exports.AddCompetance=(req,res)=>{
  const newCompetance= req.body;
  Etudiant.findOneAndUpdate(
    { _id: req.params.id },{ $push: { competences:newCompetance } },
    (err, etudiant) => {
    if (err) {
      res.status(500).json({
        message: "error competance can not be added" + err,
        data: null,
      });
    } else {
      res.status(201).json({
        message: "competance added successfully",
        data: etudiant,
      });
    }
  });

}

exports.AddExperience=(req,res)=>{
  const newExperience= req.body;
  Etudiant.findOneAndUpdate(
    { _id: req.params.id },{ $push: { experience:newExperience } },
    (err, etudiant) => {
    if (err) {
      res.status(500).json({
        message: "error experience can not be added" + err,
        data: null,
      });
    } else {
      res.status(201).json({
        message: "experience added successfully",
        data: etudiant,
      });
    }
  });

}

exports.AddSkill=(req,res)=>{
  console.log("iiiiiiiiiiiiiiiiiii",req.body);
  const newSkill= req.body;
  Etudiant.findOneAndUpdate(
    { _id: req.params.id },{ $push: { Skills:newSkill } },
    (err, etudiant) => {
    if (err) {
      res.status(500).json({
        message: "error Skill can not be added" + err,
        data: null,
      });
    } else {
      res.status(201).json({
        message: "Skill added successfully",
        data: etudiant,
      });
    }
  });

}


exports.AddFormation=(req,res)=>{
  const newForamation= req.body;
  Etudiant.findOneAndUpdate(
    { _id: req.params.id },{ $push: { formations:newForamation } },
    (err, etudiant) => {
    if (err) {
      res.status(500).json({
        message: "error formation can not be added" + err,
        data: null,
      });
    } else {
      res.status(201).json({
        message: "formation added successfully",
        data: etudiant,
      });
    }
  });

}

exports.getAllTopics=(req,res)=>{
  console.log("id =",req.params.id);
  Etudiant.findOne({ _id: req.params.id })
    .populate({ path: "topics"})
    .then((etudiant) => {
      if (etudiant) {
        console.log("jjjjjjjjjjjj1");
        res.status(200).json({
          message: "here is all my topics",
          data: etudiant.topics,
        });
        console.log("jjjjjjjjjjjj2");
      } else {
        console.log("jjjjjjjjjjjj3");
        res.status(200).json({
          message: "etudiant non trouvé",
          data: null,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "error " + err,
      });
    });
};



// exports.AddSocialMediaLink=(req,res)=>{
//   const newLink= req.body;
//   Etudiant.findOneAndUpdate(
//     { _id: req.params.id },{ $push: { formations:newLink } },
//     (err, etudiant) => {
//     if (err) {
//       res.status(500).json({
//         message: "error newLink can not be added" + err,
//         data: null,
//       });
//     } else {
//       res.status(201).json({
//         message: "newLink added successfully",
//         data: etudiant,
//       });
//     }
//   });

// }
