const { authJwt } = require("../middleware");
const controller = require("../controllers/muestra.controller");
const { check, validationResult } = require('express-validator');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, x-access-hash, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/muestras/qrs", 
    [
      authJwt.verifyToken
    ],
    controller.hashList
  );

  app.get("/api/muestras/list",
    [
      authJwt.verifyToken,
    ],
    controller.findMuestrasAll
  );

  



};
