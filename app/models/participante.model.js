module.exports = (sequelize, Sequelize) => {
  const Particiante = sequelize.define("participantes", {
    name: {
      type: Sequelize.STRING
    },
    hash: {
      type: Sequelize.STRING
    },
  });

  return Particiante;
};
