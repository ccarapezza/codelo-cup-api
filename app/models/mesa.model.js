module.exports = (sequelize, Sequelize) => {
  const Mesa = sequelize.define("mesas", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Mesa;
};
