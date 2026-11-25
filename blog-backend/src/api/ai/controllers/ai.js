"use strict";

module.exports = {
  async generate(ctx) {
    try {
      const { topic } = ctx.request.body;

      if (!topic) {
        return ctx.badRequest("Topic is required");
      }

      // Generate the blog using Gemini
      const aiService = strapi.service("api::ai.ai");

      const result = await aiService.generateBlog(topic);

      // Create the article as a draft
      const slug = result.title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/(^-|-$)/g, "");

const article = await strapi.documents("api::article.article").create({
  data: {
    title: result.title,
    description: result.description.substring(0, 80),
    slug: slug,
    content: result.content,
  },
});

      return ctx.send({
        success: true,
        message: "Blog generated and saved as draft",
        data: {
          article,
          generated: result,
        },
      });
    } catch (error) {
      strapi.log.error("AI blog generation error:", error);

      return ctx.internalServerError("Failed to generate blog");
    }
  },
};