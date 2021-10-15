module.exports = (sequelize, Sequelize) => {
  const Mesa = sequelize.define("mesas", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Mesa;
};
