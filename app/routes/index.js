const homeRoutes = (router) => {
  router.get("/", (req, res) =>
    router.app.controllers.index.home(router, req, res)
  );
};

module.exports = homeRoutes;
