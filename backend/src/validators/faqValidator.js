const { body } = require("express-validator");

exports.createFaqValidator = [
  body("question")
    .notEmpty()
    .withMessage("Question is required")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Question must be at least 10 characters long"),

  body("answer")
    .notEmpty()
    .withMessage("Answer is required")
    .trim()
    .isLength({ min: 20 })
    .withMessage("Answer must be at least 20 characters long"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .isIn(["general", "technical", "billing", "other"])
    .withMessage("Invalid category"),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a positive integer"),
];

exports.updateFaqValidator = [
  body("question")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Question must be at least 10 characters long"),

  body("answer")
    .optional()
    .trim()
    .isLength({ min: 20 })
    .withMessage("Answer must be at least 20 characters long"),

  body("category")
    .optional()
    .isIn(["general", "technical", "billing", "other"])
    .withMessage("Invalid category"),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a positive integer"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
];
