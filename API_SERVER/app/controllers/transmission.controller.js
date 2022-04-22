// Retrieve all Transmissions from the database.
const Transmission  = require("../models/transmission.model.js");

exports.allTransmissions = (req, res) => {
  Transmission.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Transmissions."
      });
    else res.send(data);
  });
};