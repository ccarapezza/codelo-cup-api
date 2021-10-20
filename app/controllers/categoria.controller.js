const db = require("../models");
const Categoria = db.categoria;

exports.create = (req, res) => {
  const data = req.body;
  Categoria.create({
    name: data.name,
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

exports.findAll = (req, res) => {
  Categoria.findAll().then((categorias) => {
    res.status(200).send(categorias);
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};
