// Retrieve all Fuels from the database.
const Fuel  = require("../models/fuel.model.js");

exports.allFuels = (req, res) => {
  Fuel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Fuels."
      });
    else res.send(data);
  });
};