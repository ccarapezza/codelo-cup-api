const db = require("../models");
const Participante = db.participante;
const Muestra = db.muestra;
const Calificacion = db.calificacion;
const Categoria = db.categoria;
const Mesa = db.mesa;
const Dojo = db.dojo;
const Op = db.Sequelize.Op;
const crypto = require('crypto');

exports.create = async(req, res) => {
  const data = req.body;

  const participantesN = await Participante.findAll({raw: true, attributes: ['n']});
  const usedParticipantesNs = participantesN.map((participante)=>participante.n);
  let availableParticipantesN = new Array();
  let maxParticipantesN = 120;
  maxParticipantesN = maxParticipantesN<=participantesN.length?participantesN.length+20:maxParticipantesN;
  for(let i=1; i<maxParticipantesN; i++){
    if(!usedParticipantesNs.includes(i)){
      availableParticipantesN.push(i);
    }
  }
  const n = availableParticipantesN[Math.floor(Math.random() * availableParticipantesN.length)];

  const muestrasN = await Muestra.findAll({raw: true, attributes: ['n']});
  const usedMuestrasNs = muestrasN.map((muestra)=>muestra.n);
  let availableMuestraN = new Array();
  let maxMuestrasN = 120;
  maxMuestrasN = maxMuestrasN<=muestrasN.length?muestrasN.length+20:maxMuestrasN;
  for(let i=1; i<maxMuestrasN; i++){
    if(!usedMuestrasNs.includes(i)){
      availableMuestraN.push(i);
    }
  }

  Participante.create({
    name: data.name,
    dni: data.dni,
    dojoId: data.dojoId,
    grow: data.grow,
    n: n,
    hash: crypto.createHash('sha1').update(data.id+data.name+new Date().getTime().toString()).digest('hex')
  })
  .then((participante) => {
    if(data.muestras&&data.muestras.length>0){
        const hashedMuestras = data.muestras.map((muestra) => {
          const indexSel = Math.round(Math.random()*availableMuestraN.length)-1;
          const n = availableMuestraN.splice(indexSel, 1)[0];
    
          return {
            ...muestra,
            n: n,
            hash: crypto.createHash('sha1').update(data.id+data.name+muestra.id+muestra.name+new Date().getTime().toString()).digest('hex')
          };
        });
        Muestra.bulkCreate(hashedMuestras).then((muestras) => {
          participante.addMuestras(muestras).then(() => {
            res.status(200).send({ message: "Participante registered successfully!" });
          });
        });
    }else{
      res.status(200).send({ message: "Participante registered successfully!" });
    }
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.createJurado = async(req, res) => {
  const data = req.body;

  const participantesN = await Participante.findAll({raw: true, attributes: ['n']});
  const usedParticipantesNs = participantesN.map((participante)=>participante.n);
  let availableParticipantesN = new Array();
  for(let i=1; i<120; i++){
    if(!usedParticipantesNs.includes(i)){
      availableParticipantesN.push(i);
    }
  }
  const n = availableParticipantesN[Math.floor(Math.random() * availableParticipantesN.length)];

  Participante.create({
    name: data.name,
    dni: data.dni,
    esJurado: true,
    n: n,
    hash: crypto.createHash('sha1').update(data.id+data.name+new Date().getTime().toString()).digest('hex')
  })
  .then((participante) => {
    res.status(200).send({ message: "Jurado registered successfully!" });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.update = (req, res) => {
  const data = req.body;

  Participante.update({
    name: data.name,
    dojoId: data.dojoId,
    grow: data.grow,
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

exports.addMuestra = async(req, res) => {
  const data = req.body;
  const participanteId = data.participanteId;

  const muestraN = await Muestra.findAll({raw: true, attributes: ['n']});
  const usedMuestrasNs = muestraN.map((muestra)=>muestra.n);
  let availableMuestraN = new Array();
  for(let i=1; i<120; i++){
    if(!usedMuestrasNs.includes(i)){
      availableMuestraN.push(i);
    }
  }
  const n = availableMuestraN[Math.floor(Math.random() * availableMuestraN.length)];

  Participante.findOne({
    where: {
      id: participanteId
    }
  })
  .then((participante) => {

    Muestra.create({
      n: n,
      name: data.name,
      dni: data.dni,
      description: data.description,
      categoriaId: data.categoriaId,
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

exports.updateMuestra = (req, res) => {
  const data = req.body;

  Muestra.update({
    name: data.name,
    dni: data.dni,
    description: data.description,
    categoriaId: data.categoriaId,
  }, {
    where: {
      id: data.id
    }
  })
  .then((muestra) => {
    res.status(200).send(muestra);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.delete = (req, res) => {
  const data = req.body;

  Muestra.destroy({
    where: {
      participanteId: data.id
    }
  }).then(() => {
    Participante.destroy({
      where: {
        id: data.id
      }
    })
    .then(() => {
      res.status(200).send({ message: "Participante eliminado correctamente" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });  
};

exports.findAll = (req, res) => {
  Participante.findAll({
    include: [
      {
        model: Muestra,
        include: [Categoria],
      },
      {
        model: Mesa,
        as: "mesa"
      },
      {
        model: Mesa,
        as: "mesaSecundaria"
      },
      {
        model: Dojo
      }],
    where:{
      esJurado: false
    }
  })
  .then((participantes) => {
    res.status(200).send(participantes.map((participante)=>{
        return({
          ...participante.toJSON(),
          esInvitado: (!participante.esJurado)&&participante.muestras.length===0
        })
      }));
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.findJuradosAll = (req, res) => {
  Participante.findAll({
    include: [
      {
        model: Muestra,
        include: [Categoria],
      },
      {
        model: Mesa
      },
      {
        model: Dojo
      }],
    where:{
      esJurado: true
    }
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
    include: [{
        model: Muestra,
        include: [Categoria],
      }, {
        model: Mesa,
        as: "mesa"
      },
      {
        model: Mesa,
        as: "mesaSecundaria"
      }],
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
    include: [{model: Mesa, as: "mesa"}, {model: Mesa, as: "mesaSecundaria"}, {model: Muestra}]
  }).then((participante) => {
    if(participante){
      let participanteJson = participante.toJSON();
      participanteJson.esInvitado = ( (!participanteJson.esJurado) && participanteJson.muestras.length===0 )?true:false;
      delete participanteJson.muestras;
      res.status(200).send(participanteJson);
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
    include: [{
      model: Muestra,
      include: [Categoria],
    }],
  }).then((calificaciones) => {
    res.status(200).send({ calificaciones:
      calificaciones.map((calificacion)=>{
        return({
          valores: calificacion.valores.split(",").map((currentValor, index)=>{
            return({
              label: calificacion.muestra.categoria.labels.split(",")[index],
              valor: parseFloat(currentValor)
            })
          }),
          createdAt: calificacion.createdAt,
          updatedAt: calificacion.updatedAt,
          muestra:{
            id: calificacion.muestra.id,
            n: calificacion.muestra.n,
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

exports.getByDni = (req, res) => {
  const dni = req.query.dni;
  Participante.findOne({
    include: [{
        model: Muestra,
        include: [Categoria],
      }, {
        model: Mesa,
        as: "mesa"
      },
      {
        model: Mesa,
        as: "mesaSecundaria"
      }],
    where:{
      dni: dni
    }
  })
  .then((participante) => {
    if(participante?.mesa){
      const oParticipante = participante.toJSON();
      res.status(200).send({
        n: oParticipante.n,
        esJurado: oParticipante.esJurado,
        dni: oParticipante.dni,
        mesa:{
          id: oParticipante.mesa.id,
          name: oParticipante.mesa.name
        },
        categoria: oParticipante.muestras.map((muestra)=>{
          return (muestra.categoria.name)
        })
      });
    }else{
      res.status(400).send({ message: "Participante no encontrado o sin mesa asignada..." });  
    }
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
}
