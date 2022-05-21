const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../../controllers/userControllers");

router.route("/new-user").post(createUser);
router.route("/user").get(getAllUsers);
router.route("/user/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
