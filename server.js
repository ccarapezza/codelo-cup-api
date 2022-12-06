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
const { default: SYSTEM_PARAMS_KEYS, default: SystemParamsKeys } = require("./app/enum/SystemParamsKeys");
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
    message: "Bienvenido CodeloCup API. MAIN-RESYNC (" + process.env.NODE_ENV + ")",
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
/*
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
*/

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

async function initial() {
  await Role.create({id: 1, name: "user"});
  await Role.create({id: 2, name: "moderator"});
  await Role.create({id: 3, name: "admin"});

  let user = await User.create({
    username: "admin",
    email: "admin@admin.com",
    password: "$2a$08$7ceHWSMUYjCJbW8Aal8BVuTLqKn8LBjwWgKlV0tpx5S6DzeBLzmqC", //QKfbt4fLAT
    /*
    password: "$2a$08$ANDS1Yo6EQSQfzHQoybU2eBCR.3Ut6t4AL099R8hI3J.NE.o4vEaW", //23737nefasta
    password: "$2a$08$r7xBr0LQtrwkFjm27mNyountfloLujhhNF/6Adzl./VecMGUi0gVu", //c0p43d3n
    password: "$2a$08$7ceHWSMUYjCJbW8Aal8BVuTLqKn8LBjwWgKlV0tpx5S6DzeBLzmqC", //QKfbt4fLAT
    password: "$2a$08$6e/QNEys..r1DPhtHqxVvOtMAfYOg.60p6wW8VANtapcyZg652aRS", //admin
    */
  });

  await user.setRoles([1]);

  SystemParams.getInstance().setParam(SystemParamsKeys.RESTRICTED_BY_MESA, "false");

  await executeImport(db.sequelize);

  /*
  for (let index= 1; index < 13; index++) {
    Mesa.create({
      name: "Mesa "+index,
    });  
  }

  Categoria.create({
    name: "Exterior",
    labels: "Presentación,Aroma en Flor,Aroma Picado,Sabor Apagado,Sabor Prendido"
  });

  Categoria.create({
    name: "Interior",
    labels: "Presentación,Aroma en Flor,Aroma Picado,Sabor Apagado,Sabor Prendido"
  });

  Categoria.create({
    name: "Rosin",
    labels: "Presentación,Aroma,Sabor,Residuo"
  });
  */
}

var executeImport = async (sqlz) => {
  try {
    var sqlString = fs.readFileSync('app/import/import.sql').toString().trim();
    var sqlWithoutComments = sqlString.replace(/(\/\*[^*]*\*\/)|(\/\/[^*]*)|(--[^.].*)/gm, '');
    sqlWithoutComments = sqlWithoutComments.replace(/\r?\n|\r/g, "")
    sqlWithoutComments = sqlWithoutComments.replace(/^\s+/gm, "")
    arr = sqlWithoutComments.split(";");

    // remove empty statements
    arr = arr.filter((el) => el != '');
    arr = arr.map((el) => el + ';');

    console.log("Array...", arr);

    console.log("Executing test data...");
    for (const sql of arr) {
      await sqlz.query(sql);
    }
    console.log("Executed");
  } catch (error) {
    console.error('could not rebuild the views', error);
  }
}