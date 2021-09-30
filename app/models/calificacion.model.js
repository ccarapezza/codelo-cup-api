module.exports = (sequelize, Sequelize) => {
  const Calificacion = sequelize.define("calificaciones", {
    presentacion: {
      type: Sequelize.INTEGER
    },
    aromaPrendido: {
      type: Sequelize.INTEGER
    },
    aromaApagado: {
      type: Sequelize.INTEGER
    },
    saborPrendido: {
      type: Sequelize.INTEGER
    },
    saborApagado: {
      type: Sequelize.INTEGER
    }
  });

  return Calificacion;
};
