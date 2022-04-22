const sql = require("./db.js");

const Color = function (color) {
  this.name = color.name;
};

Color.getAll = result => {
  sql.query("SELECT * FROM vehicle_colors", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vehicle_colors: ", res);
    result(null, res);
  });
};

module.exports = Color;
