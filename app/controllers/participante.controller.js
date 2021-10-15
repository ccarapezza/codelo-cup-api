const db = require("../models");
const Participante = db.participante;
const Muestra = db.muestra;
const Calificacion = db.calificacion;
const Mesa = db.mesa;

const Op = db.Sequelize.Op;

const crypto = require('crypto');
const { calificacion } = require("../models");

exports.create = (req, res) => {
  const data = req.body;
  Participante.create({
    name: data.name,
    hash: crypto.createHash('sha1').update(data.id+data.name+new Date().getTime().toString()).digest('hex')
  })
  .then((participante) => {
    const hashedMuestras = data.muestras.map((muestra) => {
      return {
        ...muestra,
        hash: crypto.createHash('sha1').update(data.id+data.name+muestra.id+muestra.name+new Date().getTime().toString()).digest('hex')
      };
    });
    Muestra.bulkCreate(hashedMuestras).then((muestras) => {
      participante.addMuestras(muestras).then(() => {
        res.status(200).send({ message: "Participante registered successfully!" });
      });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.update = (req, res) => {
  const data = req.body;

  Participante.update({
    name: data.name,
  }, {
    where: {
      id: data.id
    }
  })
  .then((participante) => {
    participante.setMuestras(data.muestras).then((participante) => {
      res.status(200).send({ message: "Participante registered successfully!" });
    }).catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.delete = (req, res) => {
  const data = req.body;

  Participante.destroy({
    where: {
      id: data.id
    }
  })
  .then((participante) => {
    participante.setMuestras(data.muestras);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.findAll = (req, res) => {
  Participante.findAll({
    include: [Muestra, Mesa]
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
    },
    include: [Mesa]
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

exports.calificaciones = (req, res) => {
  const participanteId = req.participante?.id;
  Calificacion.findAll({
    where: {
      participanteId: {
        [Op.eq]: participanteId
      }
    },
    include: [ Muestra ]
  }).then((calificaciones) => {   
    res.status(200).send({ calificaciones:
      calificaciones.map((calificacion)=>{
        return({
          presentacion: calificacion.presentacion,
          aromaApagado: calificacion.aromaApagado,
          aromaPrendido: calificacion.aromaPrendido,
          saborApagado: calificacion.saborApagado,
          saborPrendido: calificacion.saborPrendido,
          createdAt: calificacion.createdAt,
          updatedAt: calificacion.updatedAt,
          muestra:{
            id: calificacion.muestra.id,
            hash: calificacion.muestra.hash,
          }
        })
      })
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
