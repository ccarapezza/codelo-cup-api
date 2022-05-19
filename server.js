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

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido CodeloCup API. MAIN (" + process.env.NODE_ENV + ")",
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