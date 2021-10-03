const db = require("../models");
const Participante = db.participante;
const Muestra = db.muestra;

const Op = db.Sequelize.Op;

const crypto = require('crypto');

exports.create = (req, res) => {
  const data = req.body;
  //
  Participante.create({
    name: data.name,
    hash: crypto.createHash('sha1').update(new Date().getTime().toString()).digest('hex')
  })
    .then((participante) => {
      const hashedMuestras = data.muestras.map((muestra) => {
        return {
          ...muestra,
          hash: crypto.createHash('sha1').update(new Date().getTime().toString()).digest('hex')
        };
      });
      Muestra.bulkCreate(hashedMuestras).then((muestras) => {
        participante.addMuestras(muestras).then(() => {
          res
            .status(200)
            .send({ message: "Participante registered successfully!" });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Participante.findAll({
    include: [
      {model: Muestra, as: Muestra.tableName}
    ]
  })
  .then((participantes) => {
    res.status(200).send(participantes);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.participanteLogin = (req, res) => {
  const hash = req.body.hash;
  Participante.findOne({
    where: {
      hash: hash,
    }
  }).then((participante) => {
    if(participante){
      res.status(200).send(participante);
    }else{
      res.status(500).send({ message: "Datos inválidos." });  
    }
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
