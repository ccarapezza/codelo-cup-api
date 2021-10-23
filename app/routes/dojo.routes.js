const { authJwt } = require("../middleware");
const controller = require("../controllers/dojo.controller");
const { check, validationResult } = require('express-validator');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, x-access-hash, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/dojo/create",
    [
      authJwt.verifyToken,
      check('name').exists({checkFalsy: true}),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
    ],
    controller.create
  );

  app.put(
    "/api/dojo/update",
    [
      authJwt.verifyToken,
      check('id').exists({checkFalsy: true}).custom((value, { req }) => {return !isNaN(value)}),
      check('name').exists({checkFalsy: true}),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
    ],
    controller.update
  );

  app.delete(
    "/api/dojo/delete",
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
    controller.delete
  );
  
  app.get(
    "/api/dojo/list",
    [
      authJwt.verifyToken,
    ],
    controller.findAll
  );

};
