const db = require("../models");
const Muestra = db.muestra;
const Categoria = db.categoria;

exports.hashList = (req, res) => {
  Muestra.findAll({include: [Categoria]})
  .then((muestras) => {
    res.status(200).send(muestras.map((muestra)=>{
      return({
        id:muestra.id,
        name: muestra.name,
        description: muestra.description,
        hash: muestra.hash,
        categoria: muestra.categoria
      })
    }));
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};