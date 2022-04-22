const sql = require("./db.js");

const Type = function (type) {
  this.name = type.name;
};

Type.getAll = result => {
  sql.query("SELECT * FROM vehicle_types", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("types: ", res);
    result(null, res);
  });
};

module.exports = Type;
