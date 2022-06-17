const express = require("express");
const router = express.Router();
const {
  createFaq,
  deleteFaq,
  getAllFaqs,
  getFaqsByID,
  updateFaq,
} = require("../../controllers/faqsControllers");
const { validateToken } = require("../../middlewares/loginMiddlewares");

router.route("/new-faq").post(validateToken, createFaq);
router.route("/faqs").get(validateToken, getAllFaqs);
router
  .route("/faq/:id")
  .get(validateToken, getFaqsByID)
  .put(validateToken, updateFaq)
  .delete(validateToken, deleteFaq);

module.exports = router;
