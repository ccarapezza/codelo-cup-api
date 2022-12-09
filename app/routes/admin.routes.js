const controller = require("../controllers/admin.controller");
const { check, validationResult } = require('express-validator');
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, x-access-hash, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put("/api/admin/update-mesa-restricted",
  [
    authJwt.verifyToken,
    check('value').exists({checkFalsy: true}).isString(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.updateMesaRestricted);

  app.get("/api/admin/get-mesa-restricted",
  [
    authJwt.verifyToken,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.getMesaRestricted);
};
