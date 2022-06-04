const express = require("express");
const router = express.Router();
const {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} = require("../../controllers/blogControllers");
const { validateToken } = require("../../middlewares/loginMiddlewares");

router.route("/new-blog").post(validateToken, createBlog);
router.route("/blog").get(getAllBlogs);
router
  .route("/blog/:id")
  .get(validateToken, getBlogById)
  .put(validateToken, updateBlog)
  .delete(validateToken, deleteBlog);

module.exports = router;
