const categoria = require("../controllers/categoria.controller.js");
const { authJwt } = require("../middleware/index.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Get Categorias
  app.get(
    "/api/categorias",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    categoria.findAll
  );

  app.post(
    "/api/categorias",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    categoria.create
  );

  app.get(
    "/api/categorias/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    categoria.findOne
  );

  app.put(
    "/api/categorias/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    categoria.update
  );

  app.delete(
    "/api/categorias/:id",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    categoria.delete
  );

};
