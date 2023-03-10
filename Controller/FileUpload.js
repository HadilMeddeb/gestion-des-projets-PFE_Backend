
exports.upload = (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file  uploaded", data: null });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/../../client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: err, data: null });
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
};
