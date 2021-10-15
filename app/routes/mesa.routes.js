const { authJwt } = require("../middleware");
const controller = require("../controllers/mesa.controller");
const { check, validationResult } = require('express-validator');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/mesas/all", 
  [
    authJwt.verifyToken
  ],
  controller.findAll);

  app.post("/api/mesas/add-participante", 
  [
    authJwt.verifyToken,
    check('idMesa').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
    check('idParticipante').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.addParticipanteToMesa);

  app.post("/api/mesas/add-muestra", 
  [
    authJwt.verifyToken,
    check('idMesa').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
    check('idMuestra').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.addMuestraToMesa);

  app.post("/api/mesas/remove-participante", 
  [
    authJwt.verifyToken,
    check('idMesa').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
    check('idParticipante').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.removeParticipanteToMesa);

  app.post("/api/mesas/remove-muestra", 
  [
    authJwt.verifyToken,
    check('idMesa').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
    check('idMuestra').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.removeMuestraToMesa);

  app.post("/api/mesas/create", 
  [
    authJwt.verifyToken,
    check('name').exists({checkFalsy: true}).isString(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.createMesa);

  app.delete("/api/mesas/delete", 
  [
    authJwt.verifyToken,
    check('id').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.deleteMesa);

};
