const Task = require("../Models/Task");
const ProjetPFE = require("../Models/ProjetPFE");
const { CreateTaskValidation } = require("./validation");

//createTask
exports.create = async (req, res, next) => {
  const { error } = await CreateTaskValidation(req.body);
  if (error) {
    console.log({ message: error.details[0].message });
    return res.status(500).send({ message: error.details[0].message });
  }

  Task.create(req.body)
    .then(async (task) => {
      console.log(task);

      await ProjetPFE.findOneAndUpdate(
        { _id: req.body.project },
        { $push: { tasks: task._id } },
        (error, project) => {
          if (project) {
            res.status(200).json({
              message: " task created and added successfully ",
              data: task,
            });
          } else {
            res.status(500).json({
              message: " error task can't be added to project " + error,
              data: null,
            });
          }
        }
      );
    })
    .catch((err) => {
      console.log("err", err);
    });
};
