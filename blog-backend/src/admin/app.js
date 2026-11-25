import AIWriter from "./pages/AIWriter";

export default {
  config: {
    locales: ["en"],
  },

  bootstrap(app) {
    app.addMenuLink({
      to: "/ai-writer",
      icon: () => "🤖",
      intlLabel: {
        id: "ai-writer.menu",
        defaultMessage: "AI Blog Generator",
      },
      Component: async () => AIWriter,
    });
  },
};