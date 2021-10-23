const db = require("../models");
const Dojo = db.dojo;

exports.create = (req, res) => {
  const data = req.body;
  Dojo.create({
    name: data.name,
  })
  .then((dojo) => {
    res.status(200).send(dojo);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.update = (req, res) => {
  const data = req.body;

  Dojo.update({
    name: data.name,
  }, {
    where: {
      id: data.id
    }
  })
  .then((dojo) => {
    res.status(200).send(dojo);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.delete = (req, res) => {
  const data = req.body;

  Dojo.destroy({
    where: {
      id: data.id
    }
  })
  .then((response) => {
    res.status(200).send({ message: "Dojo eliminado correctamente" });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.findAll = (req, res) => {
  Dojo.findAll().then((dojos) => {
    res.status(200).send(dojos);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
