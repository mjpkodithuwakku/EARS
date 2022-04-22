const sql = require("./db.js");

// constructor
const Meeting_participant = function (meeting_participant) {
  this.meetingId  = meeting_participant.meetingId ;
  this.participantId  = meeting_participant.participantId ;
};

Meeting_participant.create = (newMeeting_participant, result) => {
  sql.query("INSERT INTO meeting_participants SET ?", newMeeting_participant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created meeting_participant: ", { id: res.insertId, ...newMeeting_participant });
    result(null, { id: res.insertId, ...newMeeting_participant });
  });
};

Meeting_participant.findById = (meeting_participantId, result) => {
  sql.query(`SELECT * FROM meeting_participants WHERE id = ${meeting_participantId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found meeting_participant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Meeting_participant with the id
    result({ kind: "not_found" }, null);
  });
};

Meeting_participant.getAll = result => {
  sql.query("SELECT * FROM meeting_participants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("meeting_participants: ", res);
    result(null, res);
  });
};

Meeting_participant.updateById = (id, meeting_participant, result) => {
  sql.query(
    "UPDATE meeting_participants SET meetingId  = ?,participantId   = ? WHERE id = ?",
    [ meeting_participant.meetingId, meeting_participant.participantId , id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Meeting_participant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated meeting_participant: ", { id: id, ...meeting_participant });
      result(null, { id: id, ...meeting_participant });
    }
  );
};

//dynamic search meeting_participant
Meeting_participant.search = (searchMeeting_participant, result) => {

  var keys = Object.keys(searchMeeting_participant);
  var sqlQuery = "SELECT * FROM meeting_participants WHERE ";
  var count = 0;
  keys.forEach((key) => {
    count += 1;
    sqlQuery += (key + " = \'" + searchMeeting_participant[key] + "\'");
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
        // not found Meeting_participant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("meeting_participants: ", res);
      result(null, res);
    }
  );
};


Meeting_participant.changeStatusById = (id,status, result) => {
  sql.query("UPDATE meeting_participants SET status = ? WHERE id = ?", [status, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Meeting_participant with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Meeting_participant with id: ", id);
    result(null, res);
  });
};

Meeting_participant.remove = (id, result) => {
  sql.query("DELETE FROM meeting_participants WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Meeting_participant with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted meeting_participant with id: ", id);
    result(null, res);
  });
};

Meeting_participant.removeAll = result => {
  sql.query("DELETE FROM meeting_participants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} meeting_participants`);
    result(null, res);
  });
};

module.exports = Meeting_participant;