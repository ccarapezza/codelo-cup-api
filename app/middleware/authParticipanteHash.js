const db = require("../models");
const Participante = db.participante;
const Mesa = db.mesa;

verifyHash = (req, res, next) => {
  let hash = req.headers["x-access-hash"];

  if (!hash) {
    return res.status(403).send({
      message: "No hash provided!"
    });
  }

  Participante.findOne({
    where: {
      hash: hash,
    },
    include: [Mesa]
  }).then((participante) => {
    if(participante){
      req.participante = participante?.toJSON();
      next();
    }else{
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
  }).catch((err) => {
    res.status(500).send({ message: err.message });
  });
};

const authParticipanteHash = {
  verifyHash: verifyHash
};

module.exports = authParticipanteHash;
