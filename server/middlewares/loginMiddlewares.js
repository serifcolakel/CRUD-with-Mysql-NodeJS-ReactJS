const { verify } = require("jsonwebtoken");
const db = require("../config/mysqlOptions");

const validateToken = (req, res, next) => {
  const token =
    req.header("Authorization") &&
    req.header("Authorization").replace("Bearer ", "");

  try {
    if (verify(token, process.env.SECRET_KEY).exp > Date.now() / 1000) {
      db.query("SELECT * FROM auth WHERE token = ?", [token], (err, result) => {
        if (result.length === 0) {
          return res.status(401).send({ error: "Unauthorized" });
        }
      });
      next();
    } else {
      return res.status(403).send({
        message: "Token expired!",
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { validateToken };
