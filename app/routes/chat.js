const chatRoutes = (router) => {
  router.get("/chat", (req, res) =>
    router.app.controllers.chat.iniciaChat(router, req, res)
  );

  router.post("/chat", (req, res) =>
    router.app.controllers.chat.iniciaChat(router, req, res)
  );
};

module.exports = chatRoutes;