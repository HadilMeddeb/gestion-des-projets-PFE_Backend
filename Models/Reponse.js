const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const messageSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  reponseText: {
    type: String,
  },
  dateDepos: {
    type: Date,
    default: Date.now(),
  },
  commentaires: [
    {
      textMessage:{type:String},
      pieceJointe:{type:String},
    },
  ],
  pieceJointe: {
    type: String,
  },
});
const Reponse = mongoose.model("reponse", messageSchema);
module.exports = Reponse;
