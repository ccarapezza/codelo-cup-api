const db = require("../models");
const Categoria = db.categoria;

exports.create = (req, res) => {
  const data = req.body;
  Categoria.create({
    name: data.name,
    labels: data.labels,
  })
  .then((categoria) => {
    res.status(200).send(categoria);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.update = (req, res) => {
  const data = req.body;

  Categoria.update({
    name: data.name,
    labels: data.labels,
  }, {
    where: {
      id: data.id
    }
  })
  .then((categoria) => {
    res.status(200).send(categoria);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.delete = (req, res) => {
  const data = req.body;

  Categoria.destroy({
    where: {
      id: data.id
    }
  })
  .then((response) => {
    res.status(200).send({ message: "Categoria eliminada correctamente" });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.findAll = (req, res) => {
  Categoria.findAll().then((categorias) => {
    res.status(200).send(categorias);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
