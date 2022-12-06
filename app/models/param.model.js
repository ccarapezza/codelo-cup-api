module.exports = (sequelize, Sequelize) => {
  const Param = sequelize.define("params", {
    key: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.STRING
    }
  });

  return Param;
};
