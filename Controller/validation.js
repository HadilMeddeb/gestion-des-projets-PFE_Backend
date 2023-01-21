const Joi = require("@hapi/joi");

//register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    nom: Joi.string().max(255).min(2).required(),
    prenom: Joi.string().max(255).min(2).required(),
    cin: Joi.string()
      .length(8)
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string().email().required(),
    //password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

//login validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

//create Etudiant Validation
const CreateEtudiantValidation = (data) => {
  const schema = Joi.object({
    nom: Joi.string().max(255).min(2).required(),
    prenom: Joi.string().max(255).min(2).required(),
    cin: Joi.string()
      .length(8)
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string().email().required(),
    // password: Joi.string().min(6).required(),
    filiere: Joi.string().required(),
    specialite: Joi.string(),
    topics: Joi.array(),

    bio: Joi.string(),
    dateNaissance: Joi.date(),
    socialMediaLinks: Joi.object({
      linkedinLink: Joi.string(),
      facebookLink: Joi.string(),
      GitHubLink: Joi.string(),
      portfolioWebsite: Joi.string(),
      youtubeLink: Joi.string(),
    }),
    adress: Joi.object({
      pays: Joi.string().required(),
      ville: Joi.string().required(),
      municipalite: Joi.string().required(),
      avenue: Joi.string().required(),
      rue: Joi.string().required(),
      codePostal: Joi.number().required(),
    }),
    tel: Joi.string()
      .length(8)
      .pattern(/^[0-9]+$/)
      .required(),
    Skills: Joi.array().items(Joi.string()),
    RelevetDeNote: Joi.array().items(
      Joi.object({
        Notefile: Joi.string(),
        annee: Joi.number(),
        mention: Joi.string(),
      })
    ),
    experience: Joi.array().items(
      Joi.object({
        description: Joi.string(),
        poste: Joi.string(),
        dateDebut: Joi.date(),
        dateFin: Joi.date(),
        societe: Joi.string(),
        nature: Joi.string(),
      })
    ),
    formations: Joi.array().items(
      Joi.object({
        nom: Joi.string(),
        dateDebut: Joi.date(),
        dateFin: Joi.date(),
        universite: Joi.string(),
        details: Joi.string(),
      })
    ),
    competences: Joi.array().items(
      Joi.object({
        technologie: Joi.string(),
        niveau: Joi.string(),
      })
    ),
  });
  return schema.validate(data);
};

//create Encadrant Validation
const CreateEncadreurValidation = (data) => {
  const schema = Joi.object({
    nom: Joi.string().max(255).min(2).required(),
    prenom: Joi.string().max(255).min(2).required(),
    cin: Joi.string()
      .length(8)
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string().email().required(),
    // password: Joi.string().min(6).required(),
    specialite: Joi.string().required(),
    projetsPFE: Joi.array(),
    topics: Joi.array(),
  });
  return schema.validate(data);
};

//create Message Validation
const CreateMessageValidation = (data) => {
  const schema = Joi.object({
    sender: Joi.required(),
    topic: Joi.required(),
    content: Joi.string().required(),
  });
  return schema.validate(data);
};

//create projetPFE Validation
const CreateProjetPFEValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    sujet: Joi.string().required(),
    description: Joi.string().required(),
    descriptionDetaille: Joi.string().required(),
    societe: Joi.required(),
    encadreurThechnique: Joi.required(),
    postEncadreurThechnique: Joi.required(),
    dureeEstime: Joi.required(),
    encadreurAcademique: Joi.required(),
    etudiants: Joi.array().required(),
    technologies: Joi.array(),
    jury:Joi.array(),
    dateSoutenance:Joi.date(),
  });
  return schema.validate(data);
};

const CreateReponseValidation = (data) => {
  const schema = Joi.object({
    task: Joi.string().required(),
    reponseText: Joi.string().required(),
    dateDepos: Joi.string(),
    pieceJointe: Joi.string(),
    commentaires: Joi.array(),
  });
  return schema.validate(data);
};

const CreateTaskValidation = (data) => {
  const schema = Joi.object({
    tache: Joi.string().required(),
    project: Joi.required(),
    encadreur: Joi.required(),
    etatEvaluation: Joi.boolean(),
    commentaires: Joi.array(),
    dateDernierDelai: Joi.date(),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  CreateEtudiantValidation,
  CreateEncadreurValidation,
  CreateMessageValidation,
  CreateProjetPFEValidation,
  CreateTaskValidation,
  CreateReponseValidation,
};
