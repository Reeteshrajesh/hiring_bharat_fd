const Redis = require("redis");
const logger = require("../utils/logger");

class CacheService {
  constructor() {
    this.client = Redis.createClient({
      url: process.env.REDIS_URL,
    });

    this.client.on("error", (error) => {
      logger.error("Redis Client Error:", error);
    });

    this.client.connect().catch(console.error);
  }

  async get(key) {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error("Cache Get Error:", error);
      return null;
    }
  }

  async set(key, value, expireInSeconds = 3600) {
    try {
      await this.client.set(key, JSON.stringify(value), {
        EX: expireInSeconds,
      });
      return true;
    } catch (error) {
      logger.error("Cache Set Error:", error);
      return false;
    }
  }

  async clearFAQCache() {
    try {
      const keys = await this.client.keys("faqs:*");
      if (keys.length > 0) {
        await this.client.del(keys);
      }
      return true;
    } catch (error) {
      logger.error("Cache Clear Error:", error);
      return false;
    }
  }
}

module.exports = new CacheService();
