const db = require("../models");
const Calificacion = db.calificacion;
const Participante = db.participante;
const Categoria = db.categoria;
const Muestra = db.muestra;
const Mesa = db.mesa;
const Dojo = db.dojo;
const Op = db.Sequelize.Op;

exports.validar = (req, res) => {
  const data = req.body;
  const participante = req.participante;
  const participanteId = participante?.id;
  const esJurado =participante?.esJurado;

  Muestra.findOne({
    where: {
      hash:{
        [Op.eq]: data.hashMuestra
      }
    },
    include: [ Mesa ]
  }).then((muestra) => {
    if(parseInt(muestra.participanteId)===parseInt(participanteId)){//Quiere calificar su propia muestra...........
      res.status(401).send({ message: "Está intentando calificar su propia muestra" });
    }else{
      if(muestra?.mesas?.map((mesa)=>mesa.id).includes(participante?.mesa?.id)||esJurado){
        Calificacion.findOne({
          include: [ Muestra ],
          where: {
            participanteId: participanteId,
            muestraId: muestra.id
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
                muestraN: calificacion.muestra.n,
              }
            });
          }else{
            res.status(200).send({ id: muestra.id, muestraN: muestra.n });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
      }else{
        res.status(401).send({ message: "No tiene permisos para calificar esta muestra" });
      }
    }
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.calificar = (req, res) => {
  const data = req.body;
  const participante = req.participante;
  const esJurado = participante?.esJurado;

  Muestra.findOne({
    where: {
      hash:{
        [Op.eq]: data.hashMuestra
      }
    },
    include: [ Mesa ]
  }).then((muestra) => {
    if(parseInt(muestra.participanteId)===parseInt(participante?.id)){//Quiere calificar su propia muestra...........
      res.status(401).send({ message: "Está intentando calificar su propia muestra" });
    }else{
      if(muestra?.mesas?.map((mesa)=>mesa.id).includes(participante?.mesa?.id)||esJurado){
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
              muestraId: muestra.id,
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
      }else{
        res.status(401).send({ message: "No tiene permisos para calificar esta muestra" });
      }
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
      include: [
        {
          model: Participante,
          include: [Dojo, Mesa],
        },
        Categoria],
    },{
      model: Participante,
      include: [Mesa],
    }],
  }).then((calificaciones) => {
    res.status(200).send({ calificaciones: calificaciones });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.findByMuestraHash = (req, res) => {
  const hashMuestra = req.body.hashMuestra;
  const participante = req.participante;
  const esJurado = participante?.esJurado;
  if(esJurado){
    Calificacion.findAll({
      include: [
        {
          model: Muestra,
          include: [
            {
              model: Participante,
              include: [Dojo, Mesa],
            },
            Categoria
          ],
          where: {
            hash: hashMuestra
          },
        },
        {
          model: Participante,
          include: [Mesa],
        }
      ]
    }).then((calificaciones) => {
      res.status(200).send({ calificaciones: calificaciones });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  }else{
    res.status(401).send({ message: err.message });
  }
};