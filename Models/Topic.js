const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  projetCorrespondant: {
    type: Schema.Types.ObjectId,
    ref: "projetPFE",
  },
  etudiants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Etudiant",
      required:true
    },
  ],

  profEncadrant: {
    type: Schema.Types.ObjectId,
    ref: "Encadreur",
    required:true
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "message",
    },
  ],
});

const Topic = mongoose.model("topic", topicSchema);
module.exports = Topic;
