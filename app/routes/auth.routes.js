const controller = require("../controllers/auth.controller");
const { check, validationResult } = require('express-validator');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, x-access-hash, Origin, Content-Type, Accept"
    );
    next();
  });

  app.put("/api/auth/update-admin-password",
  [
    check('oldPassword').exists({checkFalsy: true}).isString(),
    check('password').exists({checkFalsy: true}).isString(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.updateAdminPassword);

  app.post("/api/auth/signin",
  [
    check('username').exists({checkFalsy: true}).isString(),
    check('password').exists({checkFalsy: true}).isString(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.signin);
};
