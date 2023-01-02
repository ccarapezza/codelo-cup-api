const express = require("express");
const cors = require("cors");
var fs = require('fs');
var http = require('http');
var https = require('https');

var privateKey  = fs.readFileSync('app/certs/key.pem', 'utf8');
var certificate = fs.readFileSync('app/certs/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

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
const { QueryTypes } = require("sequelize");
const { sequelize } = require("./app/models");
const SystemParams = require("./app/config/system.params");
const SystemParamsKeys = require("./app/enum/SystemParamsKeys");
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
    message: "Bienvenido CodeloCup API. MAIN-INITIAL-RESYNC-DB (" + process.env.NODE_ENV + ")",
  });
});

app.get("/api/is-alive", (req, res) => {
  res.json({
    message: "CodeloCup API (" + process.env.NODE_ENV + "), "+new Date().toDateString(),
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
require("./app/routes/admin.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/participante.routes")(app);
require("./app/routes/calificacion.routes")(app);
require("./app/routes/muestra.routes")(app);
require("./app/routes/categoria.routes")(app);
require("./app/routes/mesa.routes")(app);
require("./app/routes/dojo.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

var httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

if(process.env.NODE_ENV !== "production"){
  var httpsServer = https.createServer(credentials, app);
  httpsServer.listen(8443, () => {
    console.log(`Server is running on port 8443.`);
  });
}

const initial = async () => {
  await Role.create({id: 1, name: "user"});
  await Role.create({id: 2, name: "moderator"});
  await Role.create({id: 3, name: "admin"});

  let user = await User.create({
    username: "admin",
    email: "admin@admin.com",
    password: "$2a$08$6e/QNEys..r1DPhtHqxVvOtMAfYOg.60p6wW8VANtapcyZg652aRS", //admin
  });

  await user.setRoles([1]);  
  await SystemParams.getInstance().setParam(SystemParamsKeys.RESTRICTED_BY_MESA, "false");
}