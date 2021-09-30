module.exports = (sequelize, Sequelize) => {
  const Muestra = sequelize.define("muestras", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    hash: {
      type: Sequelize.STRING
    }
  });

  return Muestra;
};
