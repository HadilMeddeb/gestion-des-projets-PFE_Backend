const mongoose = require("mongoose");
// const { getProjectById } = require("../Controller/ProjetPFE");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  tache: {
    type: String,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "ProjetPFE",
    required: true,
  },
  encadreur: {
    type: Schema.Types.ObjectId,
    ref: "Encadreur",
    required: true,
  },
  etatEvaluation: {
    type: Boolean,
    default: false,
  },
  dateCreation:{
    type: Date,
    default: Date.now(),
  },

  dateDernierDelai: { type: Date, default: Date.now() },

  pieceJointe: {
    type: String,
  },

  Reponses:[
    {
      type: Schema.Types.ObjectId,
      ref: "reponse",
    },
  ],
});

const Task = mongoose.model("task", TaskSchema);
module.exports = Task;
