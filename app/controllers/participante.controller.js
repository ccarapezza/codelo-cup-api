const db = require("../models");
const Participante = db.participante;
const Muestra = db.muestra;
const Calificacion = db.calificacion;
const Mesa = db.mesa;
const Op = db.Sequelize.Op;
const crypto = require('crypto');

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
    res.status(200).send(participante);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.removeMuestra = (req, res) => {
  const id = req.body.id;
  
  Muestra.destroy({
    where: {
      id: id
    }
  })
  .then((response) => {
    res.status(200).send({ message: "Muestra eliminada correctamente" });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.addMuestra = (req, res) => {
  const data = req.body;
  const participanteId = data.participanteId;

  Participante.findOne({
    where: {
      id: participanteId
    }
  })
  .then((participante) => {

    Muestra.create({
      name: data.name,
      description: data.description,
      hash: crypto.createHash('sha1').update(participanteId+data.name+new Date().getTime().toString()).digest('hex')
    }).then((muestra) => {

      participante.addMuestra(muestra).then((muestra) => {
        res.status(200).send(muestra);
      }).catch((err) => {
        res.status(500).send({ message: err.message });
      });
      
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
  .then((response) => {
    res.status(500).send({ message: "Participante eliminado correctamente" });
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

exports.getById = (req, res) => {
  const id = req.query.id;
  Participante.findOne({
    include: [Muestra, Mesa],
    where:{
      id: id
    }
  })
  .then((participante) => {
    res.status(200).send(participante);
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
  console.log("Calificaciones!!", req.participante);
  const participanteId = req.participante?.id;
  Calificacion.findAll({
    where: {
      participanteId: {
        [Op.eq]: participanteId
      }
    },
    include: [ Muestra ]
  }).then((calificaciones) => {
    console.log("Calificaciones List!!", calificaciones);
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
