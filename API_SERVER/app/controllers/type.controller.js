// Retrieve all Types from the database.
const Type  = require("../models/type.model.js");

exports.allTypes = (req, res) => {
  Type.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Types."
      });
    else res.send(data);
  });
};