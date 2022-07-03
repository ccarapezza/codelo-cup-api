module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define("categorias", {
    name: {
      type: Sequelize.STRING
    },
    labels: {
      type: Sequelize.STRING
    }
  });

  return Categoria;
};
