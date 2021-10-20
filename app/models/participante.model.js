module.exports = (sequelize, Sequelize) => {
  const Particiante = sequelize.define("participantes", {
    name: {
      type: Sequelize.STRING
    },
    hash: {
      type: Sequelize.STRING
    },
    grow: {
      type: Sequelize.STRING
    },
    esJurado: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  });

  return Particiante;
};
