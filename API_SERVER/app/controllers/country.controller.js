// Retrieve all Countries from the database.
const Country  = require("../models/country.model.js");

exports.allCountries = (req, res) => {
  Country.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Countries."
      });
    else res.send(data);
  });
};