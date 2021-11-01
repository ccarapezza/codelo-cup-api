const db = require("../models");
const Mesa = db.mesa;
const Muestra = db.muestra;
const Participante = db.participante;
const Categoria = db.categoria;

exports.findAll = (req, res) => {
  Mesa.findAll({
    include: [ {
      model: Muestra,
      include: [Categoria],
    }, {
      model: Participante,
      include: [Muestra],
    } ]
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
      include: [ Muestra ],
      where: {
        id: idParticipante
      }
    })
    .then((participante) => {
      let forbidden = false;
      const muestrasDelParticipante = participante.muestras;
      const muestrasDeLaMesa = mesa.muestras;
      for (const muestraDelParticipante of muestrasDelParticipante) {
          for (const muestraDeLaMesa of muestrasDeLaMesa) {
              forbidden = forbidden || muestraDeLaMesa.id === muestraDelParticipante.id;
          }
      }
      if(!forbidden){
        mesa.addParticipante(participante).then((newMesa) => {
          res.status(200).send({ message: "Participante agregado a la mesa" });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
      }else{
        res.status(401).send({ message: "No se puede agregar el participante a esta mesa." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.removeParticipanteToMesa = (req, res) => {
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
      mesa.removeParticipante(participante).then((newMesa) => {
        res.status(200).send({ message: "Participante eliminado de la mesa" });
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
      const participantesDeLaMesa = mesa.participantes;
      for (const participanteDeLaMesa of participantesDeLaMesa) {
          for (const muestra of participanteDeLaMesa.muestras) {
              forbidden = forbidden || muestra.id===parseInt(idMuestra);
          }
      }
      if(!forbidden){
        mesa.addMuestra(muestra).then((newMesa) => {
          res.status(200).send({ message: "Muestra agregada a la mesa" });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
      }else{
        res.status(401).send({ message: "No se puede agregar la muestra a esta mesa." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.removeMuestraToMesa = (req, res) => {
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
      mesa.removeMuestra(muestra).then((newMesa) => {
        res.status(200).send({ message: "Muestra eliminada de la mesa" });
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

exports.createMesa = (req, res) => {
  const name = req.body.name;

  Mesa.create({
    name: name
  }).then((mesa) => {
    res.status(200).send({ mesa });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.deleteMesa = (req, res) => {
  const id = req.body.id;

  Mesa.destroy({
    where: {
        id: id
    }
  }).then((mesa) => {
    res.status(200).send({ message: "Mesa eliminada correctamente" });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.updateMesa = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  Mesa.update({ name: name }, {
    where: {
      id: id
    }
  }).then((mesa) => {   
    res.status(200).send(mesa);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};