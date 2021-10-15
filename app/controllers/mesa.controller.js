const db = require("../models");
const Mesa = db.mesa;
const Muestra = db.muestra;
const Participante = db.participante;

exports.findAll = (req, res) => {
  Mesa.findAll({
    include: [ Muestra, Participante ]
  })
  .then((mesas) => {
    res.status(200).send(mesas);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.addParticipanteToMesa = (req, res) => {
  const idParticipante = req.body.idParticipante;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    },
    include: [ Muestra, Participante ]
  })
  .then((mesa) => {
    Participante.findOne({
      where: {
        id: idParticipante
      }
    })
    .then((participante) => {
      mesa.addParticipante(participante).then((newMesa) => {
        res.status(200).send({ newMesa });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.addMuestraToMesa = (req, res) => {
  const idMuestra = req.body.idMuestra;
  const idMesa = req.body.idMesa;

  Mesa.findOne({
    where: {
      id: idMesa
    },
    include: [ Muestra, Participante ]
  })
  .then((mesa) => {
    Muestra.findOne({
      where: {
        id: idMuestra
      }
    })
    .then((muestra) => {
      mesa.addMuestra(muestra).then((newMesa) => {
        res.status(200).send({ newMesa });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};