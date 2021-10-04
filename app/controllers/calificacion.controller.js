const db = require("../models");
const Calificacion = db.calificacion;
const Participante = db.participante;
const Muestra = db.muestra;

const Op = db.Sequelize.Op;

const crypto = require('crypto');

exports.calificar = (req, res) => {
  const data = req.body;

  Muestra.findOne({
    where: {
      hash: hash,
    }
  }).then((muestra) => {
    
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });

  //
  Calificacion.create({
    muestra: muestra,
    participante: muestra,
    presentacion: "",
    aromaPrendido: "",
    aromaApagado: "",
    saborPrendido: "",
    saborApagado: ""
  })
  .then((calificacion) => {
    
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
