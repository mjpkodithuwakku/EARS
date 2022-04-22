const sql = require("./db.js");

const Transmission = function (transmission) {
  this.name = transmission.name;
};

Transmission.getAll = result => {
  sql.query("SELECT * FROM vehicle_transmissions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transmissions: ", res);
    result(null, res);
  });
};

module.exports = Transmission;
