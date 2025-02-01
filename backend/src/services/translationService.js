const { translate } = require("google-translate-api");
const logger = require("../utils/logger");

class TranslationService {
  async translate(text, targetLang) {
    try {
      const result = await translate(text, { to: targetLang });
      return result.text;
    } catch (error) {
      logger.error("Translation Error:", error);
      return text; // Return original text on error
    }
  }
}

module.exports = new TranslationService();
