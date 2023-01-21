const Admin = require("../Models/Admin");
const {registerValidation}= require('../Controller/validation');

// create Admin
exports.create = async (req, res, next) => {
    const { error } = await registerValidation(req.body);
    console.log("validation error = ");
    if (error) {
      console.log({ message: error.details[0].message });
      return res.status(500).send({ message: error.details[0].message });
    }
  
    //checking if the Admin is already in the database
    const emailExist = await Admin.findOne({ email: req.body.email });
  
    if (emailExist)
      return res.status(500).send({ message: "email already exist" });
  
    // hash passwords
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hashSync(Math.random().toString(36).slice(-8), salt);
  
    //create a new Admin
    const admin = new Admin({
        nom: req.body.nom,
        prenom: req.body.prenom,
        cin: req.body.cin,
        email: req.body.email,
        // password: hashedPassword,
    });
  
    try {
      const savedAdmin = await admin.save();
      res.status(201).send({
        message: "success",
        data: savedAdmin,
      });
      
    } catch (err) {
      res.status(300).send({
        message: " registration failed" + err,
        data: null,
      });
    }
  };