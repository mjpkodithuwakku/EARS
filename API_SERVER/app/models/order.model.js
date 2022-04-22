const sql = require("./db.js");

// constructor
const Order = function (order) {
  this.name = order.name;
  this.email = order.email;
  this.phoneNo = order.phoneNo;
  this.message = order.message;
  this.countryId = order.countryId;
  this.userId = order.userId;
  this.productId = order.productId;
  this.status = order.status;
};

Order.create = (newOrder, result) => {
  sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created order: ", { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};

Order.findById = (orderId, result) => {
  sql.query(`SELECT * FROM orders WHERE id = ${orderId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found order: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Order with the id
    result({ kind: "not_found" }, null);
  });
};

Order.getAll = result => {
  sql.query("SELECT * FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("orders: ", res);
    result(null, res);
  });
};

Order.updateById = (id, order, result) => {
  sql.query(
    "UPDATE orders SET name = ?,email = ?,phoneNo = ?, message = ?, countryId = ?,  userId = ?, productId = ?,  status = ? WHERE id = ?",
    [ order.name, order.email, order.phoneNo, order.message, order.countryId, order.userId, order.productId, order.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order: ", { id: id, ...order });
      result(null, { id: id, ...order });
    }
  );
};

//dynamic search order
Order.search = (searchOrder, result) => {

  var keys = Object.keys(searchOrder);
  var sqlQuery = "SELECT * FROM orders WHERE ";
  var count = 0;
  keys.forEach((key) => {
    count += 1;
    sqlQuery += (key + " = \'" + searchOrder[key] + "\'");
    if(count < keys.length){
      sqlQuery += "AND "
    }
    
  });  
  sql.query(
    sqlQuery,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Order with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("orders: ", res);
      result(null, res);
    }
  );
};


Order.changeStatusById = (id,status, result) => {
  sql.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Order with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order with id: ", id);
    result(null, res);
  });
};

Order.remove = (id, result) => {
  sql.query("DELETE FROM orders WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Order with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted order with id: ", id);
    result(null, res);
  });
};

Order.removeAll = result => {
  sql.query("DELETE FROM orders", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} orders`);
    result(null, res);
  });
};

module.exports = Order;