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
const Role = db.role;
const Mesa = db.mesa;
const Categoria = db.categoria;

//db.sequelize.sync();
// force: true will drop the table if it already exists
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

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
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

  for (let index=1; index <= 12; index++) {
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
}