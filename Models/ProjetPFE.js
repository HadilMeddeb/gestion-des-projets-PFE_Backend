const { string } = require("@hapi/joi");
const mongoose = require("mongoose");
const Task = require("./Task");
const Topic = require("./Topic");
const Schema = mongoose.Schema;

const projetPFESchema = new Schema({
  dateProjet: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  sujet: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  descriptionDetaille: {
    type: String,
    required: true,
  },
  societe: {
    type: String,
    required: true,
  },

  encadreurThechnique: {
    type: String,
    required: true,
  },
  postEncadreurThechnique: {
    type: String,
    required: true,
  },
  encadreurAcademique: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Encadreur",
  },
  jury: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Encadreur",
    },
  ],
  dateSoutenance: {
    type: Date,
  },
  dureeEstime: {
    type: Number,
    required: true,
  },
  etudiants: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Etudiant",
    },
  ],
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],

  technologies: [{ type: String }],
  topic: {
    type: Schema.Types.ObjectId,
    ref: "topic",
  },
  statut: {
    type: Boolean,
    required: true,
    default: false,
  },

  files: [
    {
      downloader: { type: Schema.Types.ObjectId, ref: "user" },
      fileName: { type: String },
      filePath: { type: String },
      size: { type: String },
    },
  ],
});

projetPFESchema.pre("remove", async function (next) {
  try {
    await Task.remove({
      _id: { $in: this.tasks },
    });
    next();
  } catch (err) {
    next(err);
  }
});

// schema.post("save", function (doc, next) {
//   setTimeout(function () {
//     console.log("post1");
//     next();
//   }, 10);
// });

projetPFESchema.pre("remove", async (doc, next) => {
  await Topic.remove({
    name: this.name,
  });
  next();
});

// projetPFESchema.post("save", async (doc, next) => {
//   console.log(this._id, this.sujet, this.description);
//   await Topic.create({
//     name: this.name,
//     etudiants: this.etudiants,
//     profEncadrant: this.encadreurAcademique,
//   });
//   next();
// });

const ProjetPFE = mongoose.model("projetPFE", projetPFESchema);
module.exports = ProjetPFE;
