const Order  = require("../models/order.model.js");

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Order
    const order = new Order({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        message: req.body.message,
        countryId: req.body.countryId,
        userId: req.body.userId,
        productId: req.body.productId,
        status: req.body.status
  });

  // Save Order in the database
  Order.create(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    else res.send(data);
  });
};

// Search Order
exports.search = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // search a Order
  //console.log(req.body);
  const order = req.body
    
  // search Order in the database
  Order.search(order, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the Order."
      });
    else res.send(data);
  });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  Order.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving orders."
      });
    else res.send(data);
  });
};

// Find a single Order with a orderId
exports.findOne = (req, res) => {
  Order.findById(req.params.orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.orderId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Order with id " + req.params.orderId
        });
      }
    } else res.send(data);
  });
};



// Update a Order identified by the orderId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Order.updateById(
        req.params.orderId,
        new Order(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Order with id ${req.params.orderId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Order with id " + req.params.orderId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Order with the specified orderId in the request
exports.deleteId = (req, res) => {
  Order.changeStatusById(req.params.orderId,req.params.status, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.orderId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Order with id " + req.params.orderId
        });
      }
    } else res.send({ message: `Order was deleted successfully!` });
  });
};

exports.delete = (req, res) => {
  Order.remove(req.params.orderId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.orderId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Order with id " + req.params.orderId
        });
      }
    } else res.send({ message: `Order was deleted successfully!` });
  });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders."
      });
    else res.send({ message: `All Orders were deleted successfully!` });
  });
};