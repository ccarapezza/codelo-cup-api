const { authParticipanteHash, authJwt } = require("../middleware");
const controller = require("../controllers/calificacion.controller");
const { check, validationResult } = require('express-validator');

const validateCalificacion = (calificacion) =>{
  if(!isNaN(calificacion)){
    const calificacionFloat = parseFloat(calificacion);
    if(calificacionFloat<=10&&calificacionFloat>=1){
      return true;
    }
  }
  return false;
}

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, x-access-hash, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/participante/validar-muestra",
    [
      authParticipanteHash.verifyHash,
      check('hashMuestra').exists({checkFalsy: true}).isString(),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
    ],
    controller.validar
  );
  
  app.post(
    "/api/participante/calificar",
    [
      authParticipanteHash.verifyHash,
      check('hashMuestra').exists({checkFalsy: true}).isString(),
      check('presentacion').exists({checkFalsy: true}).custom((value, { req }) => {return validateCalificacion(value);}),
      check('aromaPrendido').exists({checkFalsy: true}).custom((value, { req }) => {return validateCalificacion(value);}),
      check('aromaApagado').exists({checkFalsy: true}).custom((value, { req }) => {return validateCalificacion(value);}),
      check('saborPrendido').exists({checkFalsy: true}).custom((value, { req }) => {return validateCalificacion(value);}),
      check('saborApagado').exists({checkFalsy: true}).custom((value, { req }) => {return validateCalificacion(value);}),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
    ],
    controller.calificar
  );

  app.get("/api/calificaciones/resultados",
  [
    authJwt.verifyToken,
  ],
  controller.resultados);

  app.post("/api/calificaciones/muestra",
  [
    authJwt.verifyTokenOrJudgeHash,
    check('hashMuestra').exists({checkFalsy: true}).isString(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ],
  controller.findByMuestraHash);
};
