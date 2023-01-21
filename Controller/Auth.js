const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidation } = require("./validation");
const { loginValidation } = require("./validation");

// register
exports.register = async (req, res, next) => {
  const { error } = await registerValidation(req.body);
  console.log("validation error = ");
  if (error) {
    console.log({ message: error.details[0].message });
    return res.status(300).send({ message: error.details[0].message });
  }

  //checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist)
    return res.status(300).send({ message: "email already exist" });

  // hash passwords
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hashSync(Math.random().toString(36).slice(-8), salt);

  //create a new user
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    cin: req.body.cin,
    email: req.body.email,
    // password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).send({
      message: "success",
      data: savedUser,
    });
  } catch (err) {
    res.status(300).send({
      message: " registration failed" + err,
      data: null,
    });
  }
};




// login
exports.login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(500).json({ message: error.details[0].message,data:null });
  }
  else
  {
    await User.findOne({ email: req.body.email })
    .then(async(user) => {
      if (user) {
        await bcrypt
          .compare(req.body.password, user.password)
          .then((validpass) => {
            console.log(validpass)
            if (!validpass) {
              res.status(500).json({ message: "Invalid password", data: null });
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRE,
            });
          
            res
              .status(201)
              .json({ token: token, message: "logged in" });
          })
          .catch((err) => {
            res.status(500).json({ message: "error :" + err, data: null });
          });
      } else {
        res.status(500).json({ message: "Email does not exist ", data: null });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "error mockle 3awisa:" + err, data: null });
    });

  }

 

  // console.log("user before :", user);
  // if (!user) return res.status(400).json({ message: "Email does not exist " });

  //creat and assign token

};
