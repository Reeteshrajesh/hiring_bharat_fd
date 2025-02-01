const request = require("supertest");
const app = require("../src/app");
const FAQ = require("../src/models/Faq");
const mongoose = require("mongoose");

describe("FAQ API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await FAQ.deleteMany({});
  });

  describe("GET /api/faqs", () => {
    it("should get all FAQs", async () => {
      const response = await request(app).get("/api/faqs");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should get FAQs in specific language", async () => {
      const response = await request(app).get("/api/faqs?lang=hi");
      expect(response.status).toBe(200);
    });
  });

  describe("POST /api/faqs", () => {
    it("should create a new FAQ", async () => {
      const faqData = {
        question: "Test question?",
        answer: "Test answer for the question.",
        category: "general",
      };

      const response = await request(app)
        .post("/api/faqs")
        .set("Authorization", `Bearer ${global.testToken}`)
        .send(faqData);

      expect(response.status).toBe(201);
      expect(response.body.data.question.en).toBe(faqData.question);
    });
  });
});
