const { verifySignUp } = require("../middleware");
const controller = require("../controllers/participante.controller");
const { check, validationResult } = require('express-validator');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/participante/create",
    [
      check('name').exists({checkFalsy: true}),
      check('muestras').isArray().notEmpty().custom((value, { req }) => {
        const muestras = req.body.muestras;
        for (const muestra of muestras) {
          if(!muestra.name){
            throw new Error('El nombre de las muestras es obligatorio');
          }
        }
        return true;
      }),
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

  app.get("/api/participante/list", controller.findAll);

  app.post("/api/participante/login", controller.participanteLogin);
};
