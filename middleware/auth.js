const jwt = require("jsonwebtoken");

exports.isAuth = async (req, res, next) => {
  let token = req.headers.auth_token;

  if (!token) return res.status(401).send({ message: "Access Denied" });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    res.token=token;
    next();
  } catch (err) {
    res.status(400).send({ message: "invalid Token" });
  }
};
