const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    content: {
    type: String,
    required:true,

  },
   sender:
   {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
   },
   topic:
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'topic'
   },
  time: {
    type: Date,
    default: Date.now,
  },
  
});

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
