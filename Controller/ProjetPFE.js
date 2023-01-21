const ProjetPFE = require("../Models/ProjetPFE");
const Encadreur = require("../Models/Encadreur");
const { CreateProjetPFEValidation } = require("./validation");
const Topic = require("../Models/Topic");
const Etudiant = require("../Models/Etudiant");




exports.create = async (req, res, next) => {
  //***************************************/ validation*************************************
  const { error } = await CreateProjetPFEValidation(req.body);
  if (error) {
    console.log({ message: error.details[0].message });
    return res.status(500).send({ message: error.details[0].message });
  }
  ProjetPFE.find({ name: req.body.name })
    //*************************************** then1 creation projet******************************
    .then(async(projects) => {
      if (projects.length >= 1) {
        res.status(500).json({ message: "project name already exist" });
      } else {
        const projet=ProjetPFE.create(req.body);
        if (projet) {
          const topic=await Topic.create({
            name: req.body.name,
            etudiants: req.body.etudiants,
            profEncadrant: req.body.encadreurAcademique,
            projetcorresondant: projet._id,
          })

          if(topic)
          {
            try{
              Encadreur.findOne({ _id: req.body.encadreurAcademique },(encadreur)=>{if(encadreur){console.log("gtttttttttttttttttttt",encadreur)}else{console.log("noooooooooooooooooooooooo",req.body.encadreurAcademique)}})
              Encadreur.findOneAndUpdate(
                { _id: req.body.encadreurAcademique },
                { $push: { projetsPFE: projet._id } },
                (error, encadreur) => {
                  if (encadreur) {
                    console.log("ya rabbi2",encadreur)
                     req.body.etudiants.forEach((element) => {
                      console.log("ya rabbi3",encadreur)
                     Etudiant.findOneAndUpdate(
                      { _id: element },
                      { projetPFE: projet._id })});
                    console.log("project pushed in encadreur");
                  } else {
                    console.log("projet added and not pushed in Encadreur..  ");
                  }
                }
              );

            }catch(err){
              res.status(500).json({ error: err });
            }
          }
            //********************************** then3 update encadrant***************************************
            
            
            // .then((topic) => {
            // })
            // .catch((err) => {
            //   res.status(500).json({ error: err });
            // });
          //*************************************then4 update etudiant******************************************
        }









      }
    })
    //******************************** then2 creation topic********************************************
    // .then(async (projet) => {
      
    // })
    // .catch((err) => {
    //   res.status(500).json({ message: "error in catch : ", error: err });
    // }) 
    // .catch((err) => {
    //   res.status(500).json({ message: "error in catch : ", error: err });
    // })
};


//create ProjePFE
exports.create = async (req, res, next) => {
  //***************************************/ validation*************************************
  const { error } = await CreateProjetPFEValidation(req.body);
  if (error) {
    console.log({ message: error.details[0].message });
    return res.status(500).send({ message: error.details[0].message });
  }
  ProjetPFE.find({ name: req.body.name })
    //*************************************** then1 creation projet******************************
    .then(async(projects) => {
      if (projects.length >= 1) {
        res.status(500).json({ message: "project name already exist" });
      } else {
        const projet=ProjetPFE.create(req.body);
        if (projet) {
          const topic=await Topic.create({
            name: req.body.name,
            etudiants: req.body.etudiants,
            profEncadrant: req.body.encadreurAcademique,
            projetcorresondant: projet._id,
          })

          if(topic)
          {
            try{
              Encadreur.findOne({ _id: req.body.encadreurAcademique },(encadreur)=>{if(encadreur){console.log("gtttttttttttttttttttt",encadreur)}else{console.log("noooooooooooooooooooooooo",req.body.encadreurAcademique)}})
              Encadreur.findOneAndUpdate(
                { _id: req.body.encadreurAcademique },
                { $push: { projetsPFE: projet._id } },
                (error, encadreur) => {
                  if (encadreur) {
                    console.log("ya rabbi2",encadreur)
                     req.body.etudiants.forEach((element) => {
                      console.log("ya rabbi3",encadreur)
                     Etudiant.findOneAndUpdate(
                      { _id: element },
                      { projetPFE: projet._id })});
                    console.log("project pushed in encadreur");
                  } else {
                    console.log("projet added and not pushed in Encadreur..  ");
                  }
                }
              );



            }catch(err){
              res.status(500).json({ error: err });
            }
          }
            //********************************** then3 update encadrant***************************************
            
            
            // .then((topic) => {
            // })
            // .catch((err) => {
            //   res.status(500).json({ error: err });
            // });
          //*************************************then4 update etudiant******************************************
        }









      }
    })
    //******************************** then2 creation topic********************************************
    // .then(async (projet) => {
      
    // })
    // .catch((err) => {
    //   res.status(500).json({ message: "error in catch : ", error: err });
    // }) 
    // .catch((err) => {
    //   res.status(500).json({ message: "error in catch : ", error: err });
    // })
};

exports.getAll = (req, res) => {
  ProjetPFE.find({})
    .then((projects) => {
      if (projects.length <= 0) {
        res.status(500).json({
          message: "there is no students in system ..",
          data: "null",
        });
      } else {
        res.status(200).json({
          message: "students in system",
          data: projects,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "error " + err,
      });
    });
};

//get ProhectBy id
exports.getProjectById = (req, res) => {
  ProjetPFE.findOne({ _id: req.params.id })
    .populate({ path: "encadreurAcademique" })
    .populate({ path: "etudiants" })
    .populate({ path: "jury" })
    .populate({ path: "files", populate: { path: "downloader" } })

    .then((project) => {
      if (project) {
        res.status(201).json({
          message: "success",
          data: project,
        });
      } else {
        res.status(500).json({
          message: "failed",
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

// deleteProject

exports.deleteProject = (req, res) => {
  console.log("project", req.params.id);

  ProjetPFE.findById({ _id: req.params.id }, (err, project) => {
    if (err) {
      res.status(500).json({
        message: "error Encadreur not  deleted" + err,
        data: null,
      });
    } else {
      project.remove();
      res.status(201).json({
        message: "Encadreur deleted successfully",
        data: project,
      });
    }
  });
};

exports.pushInFiles = (req, res) => {
  try {
    ProjetPFE.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { files: req.body } },
      (error, projet) => {
        if (projet) {
          res.status(200).json({
            message: "file added successfully..",
            data: projet,
          });
        } else if (error) {
          res.status(500).json({
            message: "file not added error : " + error,
            data: null,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      message: " error  back : " + error,
    });
  }
};

exports.deleteFile = (req, res) => {
  console.log("hhhhhhhhhh jjjjjjjjjj kkkkkkkkkkkkk");
  console.log(req.body.fileId);
  console.log(req.body.projectId);
  console.log("hhhhhhhhhh jjjjjjjjjj kkkkkkkkkkkkk");

  ProjetPFE.findOneAndUpdate(
    { _id: req.body.projectId },
    { $pull: { files: { _id: req.body.fileId } } },
    { new: true },
    (error, file) => {
      if (file) {
        res.status(200).json({
          message: "file removed successfully..",
          data: file,
        });
      } else if (error) {
        res.status(500).json({
          message: "file not removed error : ",
          data: null,
        });
      }
    }
  );
};
