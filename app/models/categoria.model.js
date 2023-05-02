const Company = require("./company.model");

module.exports = (sequelize, Sequelize) => {
  const Categoria = sequelize.define("categorias", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER
    },
    code: {
      type: Sequelize.STRING
    },
    categoriaName: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    },
    companyId: {
      type: Sequelize.INTEGER,
      references: {
        // This is a reference to another model
        model: require("./company.model.js")(sequelize, Sequelize),

        // This is the column name of the referenced model
        key: 'id'
      }
    }
  });

  return Categoria;
};
