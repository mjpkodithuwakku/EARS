// Retrieve all Models from the database.
const Model  = require("../models/model.model.js");

exports.allModels = (req, res) => {
  Model.getModels(req.params.brandId,req.params.typeId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Models."
      });
    else res.send(data);
  });
};