const db = require("../models");
const Calificacion = db.calificacion;
const Participante = db.participante;
const Muestra = db.muestra;

const Op = db.Sequelize.Op;

const crypto = require('crypto');

exports.validar = (req, res) => {
  const data = req.body;
  const participante = req.participante

  Muestra.findOne({
    where: {
      hash: data.hash,
    }
  }).then((muestra) => {
    res.status(200).send({ id: muestra.id });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.calificar = (req, res) => {
  const data = req.body;
  const participante = req.participante

  Muestra.findOne({
    where: {
      hash: data.hash,
    }
  }).then((muestra) => {
    Calificacion.create({
      muestra: muestra,
      participante: participante,
      presentacion: data.participante,
      aromaPrendido: data.aromaPrendido,
      aromaApagado: data.aromaApagado,
      saborPrendido: data.saborPrendido,
      saborApagado: data.saborApagado
    })
    .then((calificacion) => {
      res.status(200).send({ calificacion: calificacion });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
