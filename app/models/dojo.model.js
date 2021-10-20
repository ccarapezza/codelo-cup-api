module.exports = (sequelize, Sequelize) => {
  const Dojo = sequelize.define("dojos", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Dojo;
};
