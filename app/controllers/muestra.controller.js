const db = require("../models");
const Muestra = db.muestra;
const Mesa = db.mesa;
const Categoria = db.categoria;
const Participante = db.participante;

exports.hashList = (req, res) => {
  Muestra.findAll({include: [Categoria, Participante]})
  .then((muestras) => {
    res.status(200).send(muestras.map((muestra)=>{
      return({
        id:muestra.id,
        n: muestra.n,
        name: muestra.name,
        description: muestra.description,
        hash: muestra.hash,
        categoria: muestra.categoria,
        participante: muestra.participante
      })
    }));
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

exports.findMuestrasAll = (req, res) => {
  Muestra.findAll({include: [Categoria, Participante]})
  .then((muestras) => {
    res.status(200).send(muestras.map((muestra)=>{
      return({
        id:muestra.id,
        n: muestra.n,
        name: muestra.name,
        description: muestra.description,
        categoria: muestra.categoria,
        participante: muestra.participante
      })
    }));
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};