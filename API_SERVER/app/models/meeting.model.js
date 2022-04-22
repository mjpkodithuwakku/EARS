const sql = require("./db.js");

// constructor
const Meeting = function (meeting) {
  this.meeting_id = meeting.meeting_id;
  this.start_at = meeting.start_at;
  this.end_at = meeting.end_at;
};

Meeting.create = (newMeeting, result) => {
  sql.query("INSERT INTO meetings SET ?", newMeeting, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created meeting: ", { id: res.insertId, ...newMeeting });
    result(null, { id: res.insertId, ...newMeeting });
  });
};

Meeting.findById = (meetingId, result) => {
  sql.query(`SELECT * FROM meetings WHERE id = ${meetingId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found meeting: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Meeting with the id
    result({ kind: "not_found" }, null);
  });
};

Meeting.getAll = result => {
  sql.query("SELECT * FROM meetings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("meetings: ", res);
    result(null, res);
  });
};

Meeting.updateById = (id, meeting, result) => {
  sql.query(
    "UPDATE meetings SET meeting_id = ?,start_at = ?,end_at = ? WHERE id = ?",
    [ meeting.meeting_id, meeting.start_at, meeting.end_at, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Meeting with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated meeting: ", { id: id, ...meeting });
      result(null, { id: id, ...meeting });
    }
  );
};

//dynamic search meeting
Meeting.search = (searchMeeting, result) => {

  var keys = Object.keys(searchMeeting);
  var sqlQuery = "SELECT * FROM meetings WHERE ";
  var count = 0;
  keys.forEach((key) => {
    count += 1;
    sqlQuery += (key + " = \'" + searchMeeting[key] + "\'");
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
        // not found Meeting with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("meetings: ", res);
      result(null, res);
    }
  );
};


Meeting.changeStatusById = (id,status, result) => {
  sql.query("UPDATE meetings SET status = ? WHERE id = ?", [status, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Meeting with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Meeting with id: ", id);
    result(null, res);
  });
};

Meeting.remove = (id, result) => {
  sql.query("DELETE FROM meetings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Meeting with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted meeting with id: ", id);
    result(null, res);
  });
};

Meeting.removeAll = result => {
  sql.query("DELETE FROM meetings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} meetings`);
    result(null, res);
  });
};

module.exports = Meeting;