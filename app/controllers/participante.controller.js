const db = require("../models");
const Participante = db.participante;
const Muestra = db.muestra;

const Op = db.Sequelize.Op;

var bcrypt = require("bcryptjs");

exports.create = (req, res) => {
  const data = req.body;
  //
  Participante.create({
    name: data.name,
    hash: bcrypt.hashSync(new Date().getTime().toString(), 10),
  })
    .then((participante) => {
      const hashedMuestras = data.muestras.map((muestra) => {
        return {
          ...muestra,
          hash: bcrypt.hashSync(new Date().getTime().toString(), 10),
        };
      });
      Muestra.bulkCreate(hashedMuestras).then((muestras) => {
        participante.addMuestras(muestras).then(() => {
          res
            .status(200)
            .send({ message: "Participante registered successfully!" });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
