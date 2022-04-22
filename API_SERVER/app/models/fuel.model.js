const sql = require("./db.js");

const Fuel = function (fuel) {
  this.name = fuel.name;
};

Fuel.getAll = result => {
  sql.query("SELECT * FROM fuel_types", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("fuel_types: ", res);
    result(null, res);
  });
};

module.exports = Fuel;
