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
    include: [ Mesa, Categoria ]
  }).then((muestra) => {
    if(parseInt(muestra.participanteId)===parseInt(participanteId)){//Quiere calificar su propia muestra...........
      res.status(401).send({ message: "Está intentando calificar su propia muestra" });
    }else{
      const mesas = muestra?.mesas?.map((mesa)=>mesa.id);
      //Categorias de las mesas del participante
      var categoriasMesa = participante?.mesa?.categorias?.map((categoria)=>categoria.id);
      if(!categoriasMesa){
        categoriasMesa = [];
      }
      categoriasMesa = categoriasMesa?.concat(participante?.mesaSecundaria?.categorias?.map((categoria)=>categoria.id));

      if(mesas.includes(participante?.mesa?.id)||mesas.includes(participante?.mesaSecundaria?.id)||categoriasMesa.includes(muestra?.categoria?.id)||esJurado){
        Calificacion.findOne({
          include: [ {
            model: Muestra,
            include: [Categoria],
          }],
          where: {
            participanteId: participanteId,
            muestraId: muestra.id
          }
        }).then((calificacion) => {
          if(calificacion){
            res.status(200).send({
              id: muestra.id,
              muestraN: calificacion.muestra.n,
              categoria: {
                id: muestra.categoria.id,
                name:muestra.categoria.name
              },
              labels: muestra.categoria.labels.split(","),
              calificacion: {
                id: calificacion.id,
                valores: calificacion.valores.split(",").map((currentValor, index)=>{
                  return({
                    label: calificacion.muestra.categoria.labels.split(",")[index],
                    valor: parseFloat(currentValor)
                  })
                }),
                createdAt: calificacion.createdAt,
                updatedAt: calificacion.updatedAt,
                participanteId: calificacion.participanteId,
              }
            });
          }else{
            res.status(200).send({
              id: muestra.id,
              muestraN: muestra.n,
              categoria: {
                id: muestra.categoria.id,
                name:muestra.categoria.name
              },
              labels: muestra.categoria.labels.split(",")
            });
          }
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
      }else{
        res.status(401).send({ message: "No tiene permisos para calificar esta muestra." });
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
    include: [ Mesa, Categoria ]
  }).then((muestra) => {
    if(parseInt(muestra.participanteId)===parseInt(participante?.id)){//Quiere calificar su propia muestra...........
      res.status(401).send({ message: "Está intentando calificar su propia muestra" });
    }else{
      const mesas = muestra?.mesas?.map((mesa)=>mesa.id);
      //Categorias de las mesas del participante
      var categoriasMesa = participante?.mesa?.categorias?.map((categoria)=>categoria.id);
      if(!categoriasMesa){
        categoriasMesa = [];
      }
      categoriasMesa = categoriasMesa?.concat(participante?.mesaSecundaria?.categorias?.map((categoria)=>categoria.id));

      if(mesas.includes(participante?.mesa?.id)||mesas.includes(participante?.mesaSecundaria?.id)||categoriasMesa.includes(muestra?.categoria?.id)||esJurado){
        Calificacion.findOne({
          where: {
            participanteId: participante?.id,
            muestraId: muestra.id,
          }
        }).then((calificacion) => {
          if(calificacion){//Update existent
            calificacion.valores = data.valores;
            calificacion.save().then((calificacion) => {
              res.status(200).send({ calificacion: calificacion });
            }).catch((err) => {
              res.status(500).send({ message: err.message });
            });
          }else{//Create new
            Calificacion.create({
              muestraId: muestra.id,
              participanteId: participante.id,
              valores: data.valores
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
      include: [{model: Mesa, as: "mesa"}, {model: Mesa, as: "mesaSecundaria"}],
    }],
    nest: true
  }).then((calificaciones) => {
    res.status(200).send({
      calificaciones: calificaciones.map((currentcalificacion)=>{
        const calificacion = currentcalificacion.toJSON();
        const valores = calificacion.valores.split(",");
        const labels = calificacion.muestra.categoria.labels.split(",");
        return({
          ...calificacion,
          valores: valores.map((currentValor, index)=>{
            return({
              label: labels[index],
              valor: parseFloat(currentValor)
            })
          })
        })
      }) 
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.findByMuestraHash = (req, res) => {
  const hashMuestra = req.body.hashMuestra;
  const participante = req.participante;
  const esJurado = participante?.esJurado;
  const esUser = req.userId?true:false;
  
  if(esJurado||esUser){
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
          include: [{model: Mesa, as: "mesa"}, {model: Mesa, as: "mesaSecundaria"}],
        }
      ]
    }).then((calificaciones) => {
      res.status(200).send({ calificaciones: calificaciones });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  }else{
    res.status(401).send({ message: "Unauthorized" });
  }
};