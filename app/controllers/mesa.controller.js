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