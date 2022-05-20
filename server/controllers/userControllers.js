const db = require("../config/mysqlOptions");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = (req, res) => {
  const query = `SELECT * FROM user`;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM user WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
const updateUser = (req, res) => {
  const { id } = req.params;
  const {
    fullName,
    userName,
    email,
    password,
    age,
    country,
    position,
    salary,
    image,
  } = req.body;
  const query = `UPDATE user SET fullName = ?, userName = ?, email = ?, password = ?, image = ?, age = ?, country = ?, position = ?, salary = ? WHERE id = ?`;
  db.query(
    query,
    [
      fullName,
      userName,
      email,
      password,
      image,
      age,
      country,
      position,
      salary,
      id,
    ],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};
const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM user WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
const createUser = (req, res) => {
  let id = uuidv4();
  const {
    fullName,
    userName,
    email,
    password,
    age,
    country,
    position,
    salary,
    image,
  } = req.body;
  const query = `INSERT INTO user (id, fullName, userName, email, password, image, age, country, position, salary) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [
      id,
      fullName,
      userName,
      email,
      password,
      image,
      age,
      country,
      position,
      salary,
    ],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(400).send({
            message: "User already exists",
            info: {
              code: err.code,
              message: err.sqlMessage,
            },
          });
        } else {
          res.status(500).send({
            message: err,
          });
        }
      } else {
        res.send(result);
      }
    }
  );
};
module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
};
