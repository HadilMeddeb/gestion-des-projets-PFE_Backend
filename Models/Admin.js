const mongoose = require("mongoose");
const User= require('./User');
const Schema = mongoose.Schema;

const adminSchema = new Schema({

  role:
  {
      type: String,
      default:"Admin",
  }

});

module.exports = User.discriminator("Admin", adminSchema);