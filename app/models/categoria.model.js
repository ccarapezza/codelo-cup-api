module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define("categorias", {
    name: {
      type: Sequelize.STRING
    }
  });

  return Mesa;
};
