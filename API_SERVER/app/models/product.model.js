const sql = require("./db.js");
const Brand = require("../models/brand.model.js");

// constructor
const Product = function (product) {
  this.sku = product.sku;
  this.name = product.name;
  this.price = product.price;
  this.date = product.date;
  this.location = product.location;
  this.brand = product.brand;
  this.model = product.model;
  this.edition = product.edition;
  this.color = product.color;
  this.vcondition = product.vcondition;
  this.bodytype = product.bodytype;
  this.enginecapacity = product.enginecapacity
  this.yom = product.yom;
  this.transmission = product.transmission;
  this.fueltype = product.fueltype;
  this.mileage = product.mileage;
  this.description = product.description;
  this.seller = product.seller;
  this.active = product.active;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { id: res.insertId, ...newProduct });
    result(null, { id: res.insertId, ...newProduct });
  });
};

//dynamic search product 
Product.search = (searchProduct, result) => {

  var keys = Object.keys(searchProduct);
  var sqlQuery = "SELECT * FROM products WHERE active = \'1\' ";
  var count = 0;
  keys.forEach((key) => {
    
    //if(count < keys.length){
    //  sqlQuery += " AND "
    //}
    count += 1;
    if(searchProduct[key] instanceof Object ){
     
      //sqlQuery += (key + " BETWEEN \'" + searchProduct[key].min + "\' AND " + searchProduct[key].max );
      /*if(searchProduct[key].hasOwnProperty("id") ){
        switch(key){
          case "brand":
            Brand.findById(searchProduct[key].id, (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  
                } else {
                  console.log("Error retriving")
                }
              } 
              else {
                console.log(data);
                sqlQuery += (key + " = \'" + data.name + "\'");
              }

            });
        }
      }*/
      if(searchProduct[key].hasOwnProperty("min") ){
        
        sqlQuery += (" AND " + key + " >= \'" + searchProduct[key].min + "\'");
      }
      if(searchProduct[key].hasOwnProperty("max")){

        sqlQuery += (" AND " + key + " <= \'"+ searchProduct[key].max +  "\'");
      }
    }
    else{
      sqlQuery += (" AND " + key + " = \'" + searchProduct[key] + "\'");
    }
    
    
  });  
  //console.log(sqlQuery);
  sql.query(
    sqlQuery,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("products: ", res);
      result(null, res);
    }
  );
};

Product.findById = (productId, result) => {
  sql.query(`SELECT * FROM products WHERE id = ${productId} AND active = ${1}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.findBySKU = (productSKU, result) => {
  sql.query(`SELECT * FROM products WHERE sku = ${productSKU} AND active = ${1}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res);
      result(null, res);
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};


Product.getAll = result => {
  sql.query(`SELECT * FROM products WHERE active = ${1}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.countAll = (countBy, result) => {
  sql.query(`SELECT ${countBy}, COUNT( ${countBy} ) FROM products WHERE active = ${1} GROUP BY ${countBy} ORDER BY ${countBy} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (id, product, result) => {
  sql.query(
      "UPDATE products SET sku = ?,name = ?,price = ?,date = ?, location = ?, brand = ?, model = ?, edition = ?, color = ?, vcondition = ?, bodytype = ?, enginecapacity = ?, yom = ?, transmission = ?, fueltype = ?, mileage = ?, description = ?, seller = ?, active = ? WHERE id = ?",
    [product.sku, product.name, product.price, product.date, product.location, product.brand, product.model, product.edition, product.color, product.vcondition, product.bodytype, product.enginecapacity, product.yom, product.transmission, product.fueltype, product.mileage, product.description, product.seller, product.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated product: ", { id: id, ...product });
      result(null, { id: id, ...product });
    }
  );
};

Product.updateBySKU = (sku, product, result) => {
    sql.query(
        "UPDATE products SET name = ?,price = ?,date = ?, location = ?, brand = ?, model = ?, edition = ?, color = ?, vcondition = ?, bodytype = ?, enginecapacity = ?, yom = ?, transmission = ?, fueltype = ?, mileage = ?, description = ?, seller = ?, active = ? WHERE sku = ?",
        [product.name, product.price, product.date, product.location, product.brand, product.model, product.edition, product.color, product.vcondition, product.bodytype, product.enginecapacity, product.yom, product.transmission, product.fueltype, product.mileage, product.description, product.seller, product.active, sku],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Product with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated product: ", { sku: sku, ...product });
            result(null, { sku: sku, ...product });
        }
    );
};

Product.deativateById = (id, result) => {
  sql.query("UPDATE products SET active = ? WHERE id = ?", [false, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Product.deativateBySKU = (sku, result) => {
  sql.query("UPDATE products SET active = ? WHERE sku = ?", [false,sku], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};
Product.remove = (id, result) => {
  sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted product with id: ", id);
    result(null, res);
  });
};

Product.removeAll = result => {
  sql.query("DELETE FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} products`);
    result(null, res);
  });
};

module.exports = Product;