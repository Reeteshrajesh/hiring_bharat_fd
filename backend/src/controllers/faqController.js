const FAQ = require("./models/Faq");
const cacheService = require("../services/cacheService");
const translationService = require("../services/translationService");
const ApiError = require("../utils/apiError");
const logger = require("../utils/logger");

exports.createFAQ = async (req, res, next) => {
  try {
    const { question, answer, category, order } = req.body;

    // Create FAQ with English content
    const faq = new FAQ({
      question: { en: question },
      answer: { en: answer },
      category,
      order,
      metadata: {
        createdBy: req.user.id,
      },
    });

    // Auto-translate to other languages
    const translations = await Promise.all([
      translationService.translate(question, "hi"),
      translationService.translate(answer, "hi"),
      translationService.translate(question, "bn"),
      translationService.translate(answer, "bn"),
    ]);

    // Add translations
    faq.question.hi = translations[0];
    faq.answer.hi = translations[1];
    faq.question.bn = translations[2];
    faq.answer.bn = translations[3];

    await faq.save();

    // Clear cache
    await cacheService.clearFAQCache();

    res.status(201).json({
      success: true,
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllFAQs = async (req, res, next) => {
  try {
    const { lang = "en", category, page = 1, limit = 10 } = req.query;

    // Try to get from cache
    const cacheKey = `faqs:${lang}:${category}:${page}:${limit}`;
    const cachedData = await cacheService.get(cacheKey);

    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
      });
    }

    // Build query
    const query = { isActive: true };
    if (category) query.category = category;

    // Execute query with pagination
    const faqs = await FAQ.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // Transform data for requested language
    const transformedFaqs = faqs.map((faq) => faq.getTranslated(lang));

    // Cache the result
    await cacheService.set(cacheKey, transformedFaqs);

    res.json({
      success: true,
      data: transformedFaqs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: await FAQ.countDocuments(query),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getFAQById = async (req, res, next) => {
  try {
    const { lang = "en" } = req.query;
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      throw new ApiError("FAQ not found", 404);
    }

    res.json({
      success: true,
      data: faq.getTranslated(lang),
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFAQ = async (req, res, next) => {
  try {
    const { question, answer, category, order, isActive } = req.body;
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      throw new ApiError("FAQ not found", 404);
    }

    // Update English content
    if (question) faq.question.en = question;
    if (answer) faq.answer.en = answer;
    if (category) faq.category = category;
    if (typeof order !== "undefined") faq.order = order;
    if (typeof isActive !== "undefined") faq.isActive = isActive;

    // Auto-translate updated content
    if (question || answer) {
      const translations = await Promise.all([
        question ? translationService.translate(question, "hi") : null,
        answer ? translationService.translate(answer, "hi") : null,
        question ? translationService.translate(question, "bn") : null,
        answer ? translationService.translate(answer, "bn") : null,
      ]);

      if (question) {
        faq.question.hi = translations[0];
        faq.question.bn = translations[2];
      }
      if (answer) {
        faq.answer.hi = translations[1];
        faq.answer.bn = translations[3];
      }
    }

    faq.metadata.lastUpdatedBy = req.user.id;
    await faq.save();

    // Clear cache
    await cacheService.clearFAQCache();

    res.json({
      success: true,
      data: faq,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      throw new ApiError("FAQ not found", 404);
    }

    await faq.remove();

    // Clear cache
    await cacheService.clearFAQCache();

    res.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
