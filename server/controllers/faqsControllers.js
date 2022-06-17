const db = require("../config/mysqlOptions");
const { v4: uuidv4 } = require("uuid");

const getAllFaqs = (req, res) => {
  const query = `SELECT * FROM faqs`;
  db.query(query, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const getFaqsByID = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM faqs WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const updateFaq = (req, res) => {
  const { id } = req.params;
  const { title, editable, deletable, answer } = req.body;
  let isEditable = editable ? 1 : 0;
  let isDeletable = deletable ? 1 : 0;
  const query = `UPDATE faqs SET title = ?, editable = ?, deletable = ?, answer = ?  WHERE id = ?`;
  db.query(
    query,
    [title, isEditable, isDeletable, answer, id],
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};
const deleteFaq = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM faqs WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const createFaq = (req, res) => {
  let id = uuidv4();
  const { title, answer, deletable, editable } = req.body;
  let isEditable = editable ? 1 : 0;
  let isDeletable = deletable ? 1 : 0;
  const query = `INSERT INTO faqs (id, title, answer, deletable, editable) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    query,
    [id, title, answer, isDeletable, isEditable],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(400).send({
            message: "faqs already exists",
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
  getAllFaqs,
  getFaqsByID,
  updateFaq,
  deleteFaq,
  createFaq,
};
