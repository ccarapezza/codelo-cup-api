const db = require("../models");
const Calificacion = db.calificacion;
const Participante = db.participante;
const Muestra = db.muestra;
const Op = db.Sequelize.Op;

exports.validar = (req, res) => {
  const data = req.body;
  const participanteId = req.participante?.id;
  Muestra.findOne({
    where: {
      hash:{
        [Op.eq]: data.hashMuestra
      }
    }
  }).then((muestra) => {
    if(parseInt(muestra.participanteId)===parseInt(participanteId)){//Quiere calificar su propia muestra...........
      res.status(401).send({ message: "Está intentando calificar su propia muestra" });
    }else{
      Calificacion.findOne({
        where: {
          participanteId: participanteId,
          muestraId: muestra.id,
        }
      }).then((calificacion) => {
        if(calificacion){
          res.status(200).send({
            id: muestra.id,
            calificacion: {
              id: calificacion.id,
              presentacion: calificacion.presentacion,
              aromaPrendido: calificacion.aromaPrendido,
              aromaApagado: calificacion.aromaApagado,
              saborPrendido: calificacion.saborPrendido,
              saborApagado: calificacion.saborApagado,
              createdAt: calificacion.createdAt,
              updatedAt: calificacion.updatedAt,
              participanteId: calificacion.participanteId,
              muestraId: calificacion.muestraId,
            }
          });
        }else{
          res.status(200).send({ id: muestra.id });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    }
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.calificar = (req, res) => {
  const data = req.body;
  const participante = req.participante;

  Muestra.findOne({
    where: {
      hash:{
        [Op.eq]: data.hashMuestra
      }
    }
  }).then((muestra) => {
    if(parseInt(muestra.participanteId)===parseInt(participante?.id)){//Quiere calificar su propia muestra...........
      res.status(401).send({ message: "Está intentando calificar su propia muestra" });
    }else{
      Calificacion.findOne({
        where: {
          participanteId: participante?.id,
          muestraId: muestra.id,
        }
      }).then((calificacion) => {
        if(calificacion){//Update existent
          calificacion.presentacion = data.presentacion;
          calificacion.aromaPrendido = data.aromaPrendido;
          calificacion.aromaApagado = data.aromaApagado;
          calificacion.saborPrendido = data.saborPrendido;
          calificacion.saborApagado = data.saborApagado;
          calificacion.save().then((calificacion) => {
            res.status(200).send({ calificacion: calificacion });
          }).catch((err) => {
            res.status(500).send({ message: err.message });
          });
        }else{//Create new
          Calificacion.create({
            muestraId: muestra.get("id"),
            participanteId: participante.id,
            presentacion: data.presentacion,
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
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
    }
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.resultados = (req, res) => {
  Calificacion.findAll({
    include: [{
      model: Muestra,
      include: Participante
    },{
      model: Participante,
    }],
  }).then((calificaciones) => {
    res.status(200).send({ calificaciones: calificaciones });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};