const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
const cors = require("cors");
const multer = require("multer");

app.use(cors());
app.use(express.json());
// /images path'e ulaşabilir olması için
app.use("/images", express.static("images"));
let date = "";
const storage = multer.diskStorage({
  destination: "./images", // uploads ile images'e dosya gönderiyoruz
  filename: function (req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      date = Date.now();
      return cb(null, `${date}_${file.originalname}`);
    } else {
      cb(new Error("Something went wrong..."), null);
    }
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employeesystem",
  multipleStatements: true,
});
app.post("/api/image", upload.single("image"), (req, res) => {
  res.send({
    image: date + "_" + req.file.originalname,
  });
});
app.get("/api/image", (req, res) => {
  res.send({
    image: req.file.originalname,
  });
});
app.post("/api/new-user", (req, res) => {
  let id = uuidv4();
  const { name, age, country, position, salary, image } = req.body;
  const query = `INSERT INTO employee (id, name, age, country, position, salary, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [id, name, age, country, position, salary, image],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(400).send({
            message: "Employee already exists",
            info: {
              code: err.code,
              message: err.sqlMessage,
            },
          });
        } else {
          res.status(500).send({
            message: "Internal server error",
          });
        }
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/api/employees", (req, res) => {
  const query = `SELECT * FROM employee`;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/api/employee/:id", (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM employee WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/api/employee/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, country, position, salary, image } = req.body;
  const query = `UPDATE employee SET name = ?, age = ?, country = ?, position = ?, salary = ?, image = ? WHERE id = ?`;
  db.query(
    query,
    [name, age, country, position, salary, image, id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.delete("/api/employee/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM employee WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});
