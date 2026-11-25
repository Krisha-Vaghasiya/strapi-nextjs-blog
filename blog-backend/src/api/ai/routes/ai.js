"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/ai/generate",
      handler: "ai.generate",
      config: {
        auth: false,
      },
    },
  ],
};