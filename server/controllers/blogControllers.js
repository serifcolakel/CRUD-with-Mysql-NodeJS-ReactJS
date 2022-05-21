const db = require("../config/mysqlOptions");
const { v4: uuidv4 } = require("uuid");

const getAllBlogs = (req, res) => {
  const query = `SELECT * FROM blog`;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const getBlogById = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM blog WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
const updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = `UPDATE blog SET title = ?, content = ? WHERE id = ?`;
  db.query(query, [title, content, id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
const deleteBlog = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM blog WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
const createBlog = (req, res) => {
  let id = uuidv4();
  const { title, content } = req.body;
  const query = `INSERT INTO blog (id, title, content) VALUES (?, ?, ?)`;
  db.query(query, [id, title, content], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        res.status(400).send({
          message: "Blog already exists",
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
  });
};
module.exports = {
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  createBlog,
};
