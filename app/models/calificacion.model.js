module.exports = (sequelize, Sequelize) => {
  const Calificacion = sequelize.define("calificaciones", {
    valores: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Calificacion;
};
