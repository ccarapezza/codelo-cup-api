const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Muestra = db.muestra;
const Participante = db.participante;
const Calificacion = db.calificacion;
const Categoria = db.categoria;
const Role = db.role;
const User = db.user;

//db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido CodeloCup API. (" + process.env.NODE_ENV + ")",
  });
});

app.get("/api/data", async (req, res) => {

  const calificacionesData = await Calificacion.findAll({
    include: [{
      model: Participante,
      where: {
        esJurado : false
      }
    }]
  });

  const calificacionesJuradoData = await Calificacion.findAll({
    include: [{
      model: Participante,
      where: {
        esJurado : true
      }
    }]
  });

  const participanteData = await Participante.findAll({
    where: {
      esJurado: false
    },
    attributes: [[db.sequelize.fn('COUNT', 'id'), 'count']],
  });

  const juradoData = await Participante.findAll({
    where: {
      esJurado: true
    },
    attributes: [[db.sequelize.fn('COUNT', 'id'), 'count']],
  });

  const muestrasData = await Muestra.findAll({
    attributes: [[db.sequelize.fn('COUNT', 'id'), 'count']],
  });
  
  res.json({
    participantes: participanteData[0],
    jurados: juradoData[0],
    muestras: muestrasData[0],
    calificaciones: calificacionesData?calificacionesData:{},
    calificacionesJurado: calificacionesJuradoData?calificacionesJuradoData:{}
  });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/participante.routes")(app);
require("./app/routes/calificacion.routes")(app);
require("./app/routes/muestra.routes")(app);
require("./app/routes/categoria.routes")(app);
require("./app/routes/dojo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
      id: 1,
      name: "user",
  });

  Role.create({
      id: 2,
      name: "moderator",
  });

  Role.create({
      id: 3,
      name: "admin",
  });

  User.create({
      username: "admin",
      email: "admin@admin.com",
      password: "$2a$08$ANDS1Yo6EQSQfzHQoybU2eBCR.3Ut6t4AL099R8hI3J.NE.o4vEaW",
  }).then((user) => {
      user.setRoles([1]);
  });

  Categoria.create({
      name: "Exterior",
  });

  Categoria.create({
      name: "Interior",
  });

  Categoria.create({
      name: "Rosin",
  });

  Categoria.create({
      name: "Hash",
  });
}