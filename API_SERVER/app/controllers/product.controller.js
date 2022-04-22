const Product  = require("../models/product.model.js");

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Product
    const product = new Product({
        sku: req.body.sku,
        name: req.body.name,
        price: req.body.price,
        date: req.body.date,
        location: req.body.location,
        brand: req.body.brand,
        model: req.body.model,
        edition: req.body.edition,
        color: req.body.color,
        vcondition: req.body.vcondition,
        bodytype: req.body.bodytype,
        enginecapacity: req.body.enginecapacity,
        yom: req.body.yom,
        transmission: req.body.transmission,
        fueltype: req.body.fueltype,
        mileage: req.body.mileage,
        description: req.body.description,
        seller: req.body.seller,
        active: req.body.active

  });

  // Save Product in the database
  Product.create(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.send(data);
  });
};

// Search Product
exports.search = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // search a Product
  //console.log(req.body);
  const product = req.body
    
  // search Product in the database
  Product.search(product, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the Product."
      });
    else res.send(data);
  });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    else res.send(data);
  });
};

// Count all Products from the database.
exports.countAll = (req, res) => {
  Product.countAll(req.params.countby, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.countby}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + req.params.countby
        });
      }
    } else res.send(data);
  });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
  Product.findById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with id " + req.params.productId
        });
      }
    } else res.send(data);
  });
};

// Find a single Product with a productSKU
exports.findSKU = (req, res) => {
  Product.findBySKU(req.params.productSKU, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with SKU ${req.params.productSKU}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Product with SKU " + req.params.productSKU
        });
      }
    } else res.send(data);
  });
};


// Update a Product identified by the productSKU in the request
exports.updateSKU = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Product.updateBySKU(
    req.params.productSKU,
    new Product(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
             message: `Not found Product with id ${req.params.productSKU}.`
          });
        } else {
          res.status(500).send({
             message: "Error updating Product with id " + req.params.productSKU
          });
        }
      } else res.send(data);
    }
  );
};

// Update a Product identified by the productId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Product.updateById(
        req.params.productId,
        new Product(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.params.productId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.productId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Product with the specified productId in the request
exports.deleteId = (req, res) => {
  Product.deativateById(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.productId
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

exports.deleteSKU = (req, res) => {
  Product.deativateBySKU(req.params.productSKU, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.productId
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};


exports.delete = (req, res) => {
  Product.remove(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.params.productId
        });
      }
    } else res.send({ message: `Product was deleted successfully!` });
  });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Product.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    else res.send({ message: `All Products were deleted successfully!` });
  });
};