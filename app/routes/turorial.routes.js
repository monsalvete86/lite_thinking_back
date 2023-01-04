const tutorials = require("../controllers/tutorial.controller.js");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get Tutorials
  app.get(
    "/api/tutorials",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    tutorials.findAll
  );

  app.post(
    "/api/tutorials",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    tutorials.create
  );

  app.get(
    "/api/tutorials/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    tutorials.findOne
  );

  app.put(
    "/api/tutorials/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    tutorials.update
  );

  app.delete(
    "/api/tutorials/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    tutorials.delete
  );

};
