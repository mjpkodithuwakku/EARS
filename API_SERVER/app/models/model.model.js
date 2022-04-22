const sql = require("./db.js");

const Model = function (model) {
  this.name = type.name;
};

Model.getModels = (brandId, typeId, result) => {
  if(typeId == 0 && brandId == 0){
    sql.query("SELECT * FROM vehicle_models", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("models: ", res);
      result(null, res);
    });
  }
  else if(brandId == 0){
    sql.query("SELECT * FROM vehicle_models WHERE typeId = ? ", [typeId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("models: ", res);
      result(null, res);
    });
  }
  else if(typeId == 0){
    sql.query("SELECT * FROM vehicle_models WHERE brandId = ? ", [brandId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("models: ", res);
      result(null, res);
    });
  }
  else{
    sql.query("SELECT * FROM vehicle_models WHERE brandId = ? AND typeId = ? ", [brandId, typeId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("models: ", res);
      result(null, res);
    });
  }
};

module.exports = Model;
