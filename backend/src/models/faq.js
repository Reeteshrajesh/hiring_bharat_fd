const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      en: { type: String, required: true },
      hi: { type: String },
      bn: { type: String },
    },
    answer: {
      en: { type: String, required: true },
      hi: { type: String },
      bn: { type: String },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["general", "technical", "billing", "other"],
    },
    order: {
      type: Number,
      default: 0,
    },
    metadata: {
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for better search performance
faqSchema.index({ "question.en": "text", "answer.en": "text" });

// Method to get translated content
faqSchema.methods.getTranslated = function (language = "en") {
  return {
    id: this._id,
    question: this.question[language] || this.question.en,
    answer: this.answer[language] || this.answer.en,
    category: this.category,
    order: this.order,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const FAQ = mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
