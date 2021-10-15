const db = require("../models");
const Muestra = db.muestra;

exports.hashList = (req, res) => {
  Muestra.findAll()
  .then((muestras) => {
    res.status(200).send(muestras.map((muestra)=>{
      return({
        id:muestra.id,
        name: muestra.name,
        description: muestra.description,
        hash: muestra.hash
      })
    }));
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });
};