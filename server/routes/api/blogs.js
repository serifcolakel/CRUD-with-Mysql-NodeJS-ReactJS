const express = require("express");
const router = express.Router();
const {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} = require("../../controllers/blogControllers");

router.route("/new-blog").post(createBlog);
router.route("/blog").get(getAllBlogs);
router.route("/blog/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;
