const express = require("express");
const router = express.Router();
const userControllers = require("../../controllers/userControllers");

router.route("/new-user").post(userControllers.createUser);
router.route("/user").get(userControllers.getAllUsers);
router
  .route("/user/:id")
  .get(userControllers.getUserById)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = router;
