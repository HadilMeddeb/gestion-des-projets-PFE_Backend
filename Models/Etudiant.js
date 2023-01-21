const { string } = require("@hapi/joi");
const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
  filiere: {
    type: String,
    required: true,
  },
  specialite: {
    type: String,

  },
  role: {
    type: String,
    default: "Etudiant",
  },
  projetPFE: {
    type: Schema.Types.ObjectId,
    ref: "ProjetPFE",
  },
  bio: {
    type: String,
    default: "",
  },
  faculte: {
    type: String,
    default: "issatSo",
  },
  topics:
  [{
    type: Schema.Types.ObjectId,
    ref: "topic",
  }],
  dateNaissance: { type: Date },
  socialMediaLinks: {
    linkedinLink: { type: String,default:"#" },
    facebookLink: { type: String,default:"#" },
    GitHubLink: { type: String,default:"#" },
    portfolioWebsite: { type: String,default:"#" },
    youtubeLink: { type: String,default:"#" },
  },
  adress: {
    pays: { type: String },
    ville: { type: String },
    municipalite: { type: String },
    avenue: { type: String },
    rue: { type: String },
    codePostal: { type: Number },
  },
  tel: { type: String },
  Skills: [{ skill: { type: String } }],

  RelevetDeNote: [
    {
      Notefile: { type: String },
      annee: { type: String },
      mention: { type: String },
    },
  ],
  experience: [
    {
      poste: { type: String },
      description: { type: String },
      dateDebut: { type: Date },
      dateFin: { type: Date },
      societe: { type: String },
      nature: { type: String },
    },
  ],
  formations: [
    {
      nom: { type: String },
      dateDebut: { type: String },
      dateFin: { type: String },
      details:{type:String},
      universite: { type: String },
    },
  ],
  competences: [{ technologie: { type: String }, niveau: { type: String } }],
});
module.exports = User.discriminator("Etudiant", etudiantSchema);
