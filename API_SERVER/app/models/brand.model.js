const sql = require("./db.js");

const Brand = function (brand) {
  this.name = brand.name;
};

Brand.getAll = result => {
  sql.query("SELECT * FROM brands", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("brands: ", res);
    result(null, res);
  });
};

Brand.findById = (brandId, result) => {
  sql.query(`SELECT * FROM brands WHERE id = ${brandId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found brand: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Brand with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Brand;
