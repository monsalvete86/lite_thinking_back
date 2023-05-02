const db = require("../models");
const Categoria = db.categoria;
const Op = db.Sequelize.Op;

// Create and Save a new Categoria
exports.create = (req, res) => {
  // Validate request
  if (!req.body.categoriaName || !req.body.code || !req.body.stock ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Categoria
  const categoria = {
    code: req.body.code,
    categoriaName: req.body.categoriaName,
    stock: req.body.stock,
    companyId: req.body.companyId,
  };

  // Save Categoria in the database
  Categoria.create(categoria)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Categoria."
      });
    });
};

// Retrieve all CategoriaS from the database.
exports.findAll = (req, res) => {
  const categoriaName = req.query.categoriaName;
  var condition = categoriaName ? { categoriaName: { [Op.like]: `%${categoriaName}%` } } : null;

  Categoria.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categoriaS."
      });
    });
};

// Find a single Categoria with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categoria.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Categoria with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Categoria with id=" + id
      });
    });
};

// Update a Categoria by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Categoria.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categoria was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Categoria with id=${id}. Maybe Categoria was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Categoria with id=" + id
      });
    });
};

// Delete a Categoria with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Categoria.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categoria was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Categoria with id=${id}. Maybe Categoria was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Categoria with id=" + id
      });
    });
};

