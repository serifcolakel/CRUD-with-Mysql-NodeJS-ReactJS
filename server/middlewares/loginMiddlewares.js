const { verify } = require("jsonwebtoken");
const db = require("../config/mysqlOptions");

const validateToken = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) return res.json({ error: "User not logged in!" });

  try {
    db.query("SELECT * FROM auth WHERE token = ?", [token], (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length === 0) {
        return res.status(404).send({
          message: "Token not found!",
        });
      }
      if (verify(token, process.env.SECRET_KEY).exp > Date.now() / 1000) {
        next();
      } else {
        return res.status(403).send({
          message: "Token expired!",
        });
      }
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { validateToken };
