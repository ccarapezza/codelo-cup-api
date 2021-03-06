const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(process.env.DATABASE_URL, {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        pool: {
          max: config.pool.max,
          min: config.pool.min,
          acquire: config.pool.acquire,
          idle: config.pool.idle,
        },
      })
    : new Sequelize(config.DB, config.USER, config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
          max: config.pool.max,
          min: config.pool.min,
          acquire: config.pool.acquire,
          idle: config.pool.idle,
        },
      });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.muestra = require("../models/muestra.model.js")(sequelize, Sequelize);
db.categoria = require("../models/categoria.model.js")(sequelize, Sequelize);
db.participante = require("../models/participante.model.js")(sequelize, Sequelize);
db.calificacion = require("../models/calificacion.model.js")(sequelize, Sequelize);
db.dojo = require("../models/dojo.model.js")(sequelize, Sequelize);
db.mesa = require("../models/mesa.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.participante.belongsTo(db.mesa, {
  foreignKey: {
    name: 'mesaId'
  }
});
db.participante.belongsTo(db.mesa, {
  as: "mesaSecundaria",
  foreignKey: {
    name: 'mesaSecundariaId'
  }
});

db.participante.hasMany(db.muestra);
db.participante.belongsTo(db.dojo);
db.participante.hasMany(db.calificacion);

db.muestra.belongsTo(db.participante);
db.muestra.belongsTo(db.categoria);
db.muestra.belongsToMany(db.mesa, {
  through: "muestra_mesa",
  foreignKey: "muestraId",
  otherKey: "mesaId",
});

db.mesa.hasMany(db.participante, {
  foreignKey: {
    name: 'mesaId'
  }
});
db.mesa.hasMany(db.participante, {
  as: "participantesSecundarios",
  foreignKey: {
    name: 'mesaSecundariaId'
  }
});
db.mesa.belongsToMany(db.muestra, {
  through: "muestra_mesa",
  foreignKey: "mesaId",
  otherKey: "muestraId",
});

db.calificacion.belongsTo(db.participante);
db.calificacion.belongsTo(db.muestra);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
