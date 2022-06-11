const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../../controllers/userControllers");
const { validateToken } = require("../../middlewares/loginMiddlewares");

router.route("/new-user").post(validateToken, createUser);
router.route("/user").get(validateToken, getAllUsers);
router
  .route("/user/:id")
  .get(validateToken, getUserById)
  .put(validateToken, updateUser)
  .delete(validateToken, deleteUser);

module.exports = router;
