// Retrieve all Colors from the database.
const Color  = require("../models/color.model.js");

exports.allColors = (req, res) => {
  Color.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Colors."
      });
    else res.send(data);
  });
};