const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faqController");
const { validate } = require("../middleware/validate");
const { auth } = require("../middleware/auth");
const {
  createFaqValidator,
  updateFaqValidator,
} = require("../validators/faqValidator");

/**
 * @swagger
 * /api/faqs:
 *   get:
 *     summary: Get all FAQs
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           enum: [en, hi, bn]
 *         description: Language code
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: FAQ category
 *     responses:
 *       200:
 *         description: List of FAQs
 */
router.get("/", faqController.getAllFAQs);

/**
 * @swagger
 * /api/faqs/{id}:
 *   get:
 *     summary: Get FAQ by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get("/:id", faqController.getFAQById);

/**
 * @swagger
 * /api/faqs:
 *   post:
 *     summary: Create new FAQ
 *     security:
 *       - bearerAuth: []
 */
router.post("/", auth, createFaqValidator, validate, faqController.createFAQ);

/**
 * @swagger
 * /api/faqs/{id}:
 *   put:
 *     summary: Update FAQ
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", auth, updateFaqValidator, validate, faqController.updateFAQ);

/**
 * @swagger
 * /api/faqs/{id}:
 *   delete:
 *     summary: Delete FAQ
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", auth, faqController.deleteFAQ);

module.exports = router;
