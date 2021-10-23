module.exports = (sequelize, Sequelize) => {
  const Calificacion = sequelize.define("calificaciones", {
    presentacion: {
      type: Sequelize.FLOAT
    },
    aromaPrendido: {
      type: Sequelize.FLOAT
    },
    aromaApagado: {
      type: Sequelize.FLOAT
    },
    saborPrendido: {
      type: Sequelize.FLOAT
    },
    saborApagado: {
      type: Sequelize.FLOAT
    }
  });

  return Calificacion;
};
