// Retrieve all Brands from the database.
const Brand  = require("../models/brand.model.js");

exports.allBrands = (req, res) => {
  Brand.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Brands."
      });
    else res.send(data);
  });
};