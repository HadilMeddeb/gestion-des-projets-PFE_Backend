const Encadreur = require("../Models/Encadreur");
const { CreateEncadreurValidation } = require("../Controller/validation");




// create Encadreur
exports.create = async (req, res, next) => {
  const { error } = await CreateEncadreurValidation(req.body);
  console.log("validation error = ");
  if (error) {
    console.log({ message: error.details[0].message });
    return res.status(500).send({ message: error.details[0].message });
  }

  //checking if the Encadreur is already in the database
  const emailExist = await Encadreur.findOne({ email: req.body.email });

  if (emailExist)
    return res.status(500).send({ message: "email already exist" });

  // hash passwords
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hashSync(Math.random().toString(36).slice(-8), salt);

  //create a new Encadreur
  const encadreur = new Encadreur({
    nom: req.body.nom,
    prenom: req.body.prenom,
    cin: req.body.cin,
    email: req.body.email,
    // password: hashedPassword,
    specialite: req.body.specialite,
    projetsPFE: req.body.projetsPFE,
  });

  try {
    const savedEncadreur = await encadreur.save();
    res.status(201).send({
      message: "success",
      data: savedEncadreur,
    });
  } catch (err) {
    res.status(300).send({
      message: " registration failed" + err,
      data: null,
    });
  }
};




//get All Encadreur
exports.getAll = (req, res) => {
  Encadreur.find({})
    .then((encadreurs) => {
      if (encadreurs.length <= 0) {
        res.status(500).json({
          message: "pas d'enseignants dans le systeme ..",
          data: "null",
        });
      } else {
        res.status(200).json({
          message: "enseignants dans le systeme ..",
          data: encadreurs,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "error " + err,
      });
    });
};



//get projects
exports.getAllProjects = (req, res) => {
  console.log("id =",req.params.id);
  Encadreur.findOne({ _id: req.params.id })
    .populate({ path: "projetsPFE",populate:{
      path : 'etudiants'
    } })
    .then((encadreur) => {
      if (encadreur) {
        res.status(200).json({
          message: "here is all my projects",
          data: encadreur.projetsPFE,
        });
      } else {
        res.status(200).json({
          message: "encadreur non trouvé",
          data: null,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "error " + err,
      });
    });
};




exports.getAllTopics=(req,res)=>{
  console.log("id =",req.params.id);
  Encadreur.findOne({ _id: req.params.id })
    .populate({ path: "topics"})
    .then((encadreur) => {
      if (encadreur) {
        console.log("jjjjjjjjjjjj1");
        res.status(200).json({
          message: "here is all my topics",
          data: encadreur.topics,
        });
        console.log("jjjjjjjjjjjj2");
      } else {
        console.log("jjjjjjjjjjjj3");
        res.status(200).json({
          message: "encadreur non trouvé",
          data: null,
        });
      }
    })
    .catch((err) => {
      console.log("jjjjjjjjjjjj1");
      res.status(500).json({
        message: "error " + err,
      });
    });
};




exports.deleteEnseignant = (req, res) => {
  console.log("enseinnnnnnnnnnnnnnnnnnnn",req.params.id)

  Encadreur.findByIdAndDelete({_id:req.params.id},(err,encadreur)=>{
    if(err)
    {
      res.status(500).json({
                            message:"error Encadreur not  deleted"+err,
                            data:null
                           });
    }
    else
    {
      res.status(201).json({
                            message:"Encadreur deleted successfully",
                            data:encadreur,                               
                          });

    }})
}



exports.updateEnseignant = (req, res) => {
  Encadreur.findOneAndUpdate({ _id: req.params.id }, req.body, (err,enseignant) => {
   
    if (err) {
      res.status(500).json({
        message: "error Enseignant not  updated" + err,
        data: null,
      });
    } else {
      Encadreur.findOne({_id:enseignant._id},(err,enseignant))
      {
        console.log("after update .....", enseignant);
      }
      res.status(201).json({
        message: "Enseignant updated successfully",
        data: enseignant,
      });
    }
  });
};


