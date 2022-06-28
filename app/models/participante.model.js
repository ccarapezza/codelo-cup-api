module.exports = (sequelize, Sequelize) => {
  const Particiante = sequelize.define("participantes", {
    n: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    dni: {
      type: Sequelize.STRING,
      unique: true,
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
