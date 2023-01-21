const Reponse = require("../Models/Reponse");
const Task = require("../Models/Task");
const { CreateReponseValidation } = require("./validation");
//createReponse
// exports.create = async (req, res, next) => {
//   const { error } = await CreateReponseValidation(req.body);
//   if (error) {
//     console.log({ message: error.details[0].message });
//     return res.status(500).send({ message: error.details[0].message });
//   }

//   Reponse.create(req.body)
//     .then(async (reponse) => {
//       await Task.findOne({ _id: req.body.task }, (error, task) => {
//         if (task) {
//           res.status(200).json({
//             message: " reponse created and added successfully ",
//             data: reponse,
//           });
//         } else if (error) {
//           res.status(500).json({
//             message: " error reponse can't be added to task " + error,
//             data: null,
//           });
//         }
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: " error " + err,
//         data: null,
//       });
//     });
// };

exports.create = async (req,res,next) => {
  const { error } = await CreateReponseValidation(req.body);
  if (error) {
    console.log({ message: error.details[0].message });
    return res.status(500).send({ message: error.details[0].message });
  }

  Reponse.create(req.body)
    .then(async(reponse) => {
      if (reponse) {
        console.log("reponse crée ", reponse);
       await Task.findOneAndUpdate(
          { _id: req.body.task },
          { $push: { reponses: reponse._id } },
          (error, task) => {
            if (task) {
              res.status(200).json({
                message: "projet added and  pushed in task..  ",
                data: task,
              });
            } else {
              res.status(500).json({
                message: "projet added but not pushed in task.. "+error,
                data: null,
              });
            }
          }
        );
      } else {
        res.status(500).json({ message: "object not created", data: null });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
