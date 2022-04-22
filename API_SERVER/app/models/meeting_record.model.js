const sql = require("./db.js");

// constructor
const Meeting_record = function (meeting_record) {
  this.json_data = meeting_record.json_data;
  this.meetingId = meeting_record.meetingId;
};

Meeting_record.create = (newMeeting_record, result) => {
  sql.query("INSERT INTO meeting_records SET ?", newMeeting_record, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created meeting_record: ", { id: res.insertId, ...newMeeting_record });
    result(null, { id: res.insertId, ...newMeeting_record });
  });
};

Meeting_record.findById = (meeting_recordId, result) => {
  sql.query(`SELECT * FROM meeting_records WHERE id = ${meeting_recordId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found meeting_record: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Meeting_record with the id
    result({ kind: "not_found" }, null);
  });
};

Meeting_record.getAll = result => {
  sql.query("SELECT * FROM meeting_records", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("meeting_records: ", res);
    result(null, res);
  });
};

Meeting_record.updateById = (id, meeting_record, result) => {
  sql.query(
    "UPDATE meeting_records SET json_data = ?,meetingId = ? WHERE id = ?",
    [ meeting_record.json_data, meeting_record.meetingId, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Meeting_record with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated meeting_record: ", { id: id, ...meeting_record });
      result(null, { id: id, ...meeting_record });
    }
  );
};

//dynamic search meeting_record
Meeting_record.search = (searchMeeting_record, result) => {

  var keys = Object.keys(searchMeeting_record);
  var sqlQuery = "SELECT * FROM meeting_records WHERE 1=1 ";
  var count = 0;
  keys.forEach((key) => {
    count += 1;
    if(searchMeeting_record[key] instanceof Object ){
      if(searchMeeting_record[key].hasOwnProperty("min") ){
        
        sqlQuery += (" AND " + key + " >= \'" + searchMeeting_record[key].min + "\'");
      }
      if(searchMeeting_record[key].hasOwnProperty("max")){

        sqlQuery += (" AND " + key + " <= \'"+ searchMeeting_record[key].max +  "\'");
      }
    }
    else{
      sqlQuery += (" AND " + key + " = \'" + searchMeeting_record[key] + "\'");
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
        // not found Meeting_record with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("meeting_records: ", res);
      result(null, res);
    }
  );
};


Meeting_record.changeStatusById = (id,status, result) => {
  sql.query("UPDATE meeting_records SET status = ? WHERE id = ?", [status, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Meeting_record with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Meeting_record with id: ", id);
    result(null, res);
  });
};

Meeting_record.remove = (id, result) => {
  sql.query("DELETE FROM meeting_records WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Meeting_record with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted meeting_record with id: ", id);
    result(null, res);
  });
};

Meeting_record.removeAll = result => {
  sql.query("DELETE FROM meeting_records", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} meeting_records`);
    result(null, res);
  });
};

module.exports = Meeting_record;