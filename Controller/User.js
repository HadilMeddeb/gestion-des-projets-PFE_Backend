const User = require("../Models/User");

exports.getUserById = async (req, res, next) => {
  console.log("id=", req.params.id);
  await User.findOne({ _id: req.params.id })
    .then((employee) => {
      console.log("employee from get by Id", employee);
      if (employee) {
        res.status(201).json({ message: "success", data: employee });
      } else {
        res.status(200).json({ message: "failed", data: null });
      }
    })
    .catch((err) => {
      console.log(" err from backend ", err, "*************");
      res.status(200).json({ message: "error from server" + err });
    });
};


exports.updateUser = (req, res) => {

  User.findOneAndUpdate({ _id: req.params.id }, req.body, (err,user) => {
    if (err) {
      res.status(500).json({
        message: "error User not  updated" + err,
        data: null,
      });
    } else {
      res.status(201).json({
        message: "User updated successfully",
        data: user,
      });
    }
  });
  
};



