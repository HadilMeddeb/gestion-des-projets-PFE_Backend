const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

const encadreurSchema = new Schema({
  specialite: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Encadreur",
  },

  projetsPFE: [
    {
      type: Schema.Types.ObjectId,
      ref: "projetPFE",
    },
  ],

  topics: [
    {
      type: Schema.Types.ObjectId,
      ref: "topic",
    },
  ],
});

module.exports = User.discriminator("Encadreur", encadreurSchema);
