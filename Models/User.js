const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { sendEmail } = require("../utils/sendMail");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar:{
    type:String,
  },
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  cin: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
  },
  password: {
    type: String,
    default: Math.random().toString(36).slice(-8),
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const stockPassword=this.password;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  await sendEmail({
    to: this.email,
    subject: "authentication information ",
    text:
      "hello " +
      this.prenom +
      this.nom +
      " here is your password  :  " +
       stockPassword+
      "  Thanks for subscription" 
  });
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
