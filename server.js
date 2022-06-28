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
const Mesa = db.mesa;
const Muestra = db.muestra;
const Participante = db.participante;
const Calificacion = db.calificacion;
const Categoria = db.categoria;
const Role = db.role;
const User = db.user;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido CodeloCup API. RESYNC (" + process.env.NODE_ENV + ")",
  });
});

app.get("/api/data", async (req, res) => {

  const mesaData = await Mesa.findAll({
    include : [
      { model: Participante, required: false, attributes: ["id", "n", "name"], include:[Calificacion] , where: {esJurado: false} },
      { model: Muestra, required: false, attributes: ["id", "n", "name"] }
    ]
  });

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
    mesaData: mesaData,
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
require("./app/routes/mesa.routes")(app);
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

  /*User.create({
      username: "admin",
      email: "admin@admin.com",
      password: "$2a$08$6e/QNEys..r1DPhtHqxVvOtMAfYOg.60p6wW8VANtapcyZg652aRS", //admin
      /*
      password: "$2a$08$ANDS1Yo6EQSQfzHQoybU2eBCR.3Ut6t4AL099R8hI3J.NE.o4vEaW", //23737nefasta
      password: "$2a$08$r7xBr0LQtrwkFjm27mNyountfloLujhhNF/6Adzl./VecMGUi0gVu", //c0p43d3n
      password: "$2a$08$7ceHWSMUYjCJbW8Aal8BVuTLqKn8LBjwWgKlV0tpx5S6DzeBLzmqC", //QKfbt4fLAT
      password: "$2a$08$6e/QNEys..r1DPhtHqxVvOtMAfYOg.60p6wW8VANtapcyZg652aRS", //admin
      */
  /*}).then((user) => {
      user.setRoles([1]);
  });*/
  
  for (let index= 1; index < 10; index++) {
      Mesa.create({
        name: "Mesa "+index,
      });  
  }

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