"use strict";

const { GoogleGenAI } = require("@google/genai");

module.exports = () => ({
  /**
   * @param {string} topic
   */
  async generateBlog(topic) {
    if (!topic) {
      throw new Error("Topic is required");
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",

      contents: `Write a high-quality blog article about "${topic}".

            Requirements:

            1. Create a clear and engaging title.

            2. Write a short description under 80 characters.

            3. Write a complete and useful blog article in Markdown.

            4. The article must include:
            - An introduction
            - Multiple ## main headings
            - ### subheadings when useful
            - Bullet points where appropriate
            - Numbered lists where appropriate
            - Bold text for important terms
            - Practical examples when appropriate
            - Code blocks only when genuinely useful
            - A ## Conclusion section

            5. Do not include the article title again inside the content.

            6. Do not use HTML.

            7. Make the article easy to understand for beginners.

            Return the result as JSON with exactly these fields:
            - title
            - description
            - content`,

      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            content: {
              type: "string",
            },
          },
          required: ["title", "description", "content"],
        },
      },
    });

    const result = JSON.parse(response.text);

    return result;
  },
});