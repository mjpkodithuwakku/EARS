const sql = require("./db.js");

// constructor
const Participant = function (participant) {
  this.name = participant.name;
  this.image = participant.image;
};

Participant.create = (newParticipant, result) => {
  sql.query("INSERT INTO participants SET ?", newParticipant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created participant: ", { id: res.insertId, ...newParticipant });
    result(null, { id: res.insertId, ...newParticipant });
  });
};

Participant.findById = (participantId, result) => {
  sql.query(`SELECT * FROM participants WHERE id = ${participantId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found participant: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Participant with the id
    result({ kind: "not_found" }, null);
  });
};

Participant.getAll = result => {
  sql.query("SELECT * FROM participants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("participants: ", res);
    result(null, res);
  });
};

Participant.updateById = (id, participant, result) => {
  sql.query(
    "UPDATE participants SET name = ?,image = ? WHERE id = ?",
    [ participant.name, participant.image, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Participant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated participant: ", { id: id, ...participant });
      result(null, { id: id, ...participant });
    }
  );
};

//dynamic search participant
Participant.search = (searchParticipant, result) => {

  var keys = Object.keys(searchParticipant);
  var sqlQuery = "SELECT * FROM participants WHERE ";
  var count = 0;
  keys.forEach((key) => {
    count += 1;
    sqlQuery += (key + " = \'" + searchParticipant[key] + "\'");
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
        // not found Participant with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("participants: ", res);
      result(null, res);
    }
  );
};


Participant.changeStatusById = (id,status, result) => {
  sql.query("UPDATE participants SET status = ? WHERE id = ?", [status, id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Participant with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Participant with id: ", id);
    result(null, res);
  });
};

Participant.remove = (id, result) => {
  sql.query("DELETE FROM participants WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Participant with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted participant with id: ", id);
    result(null, res);
  });
};

Participant.removeAll = result => {
  sql.query("DELETE FROM participants", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} participants`);
    result(null, res);
  });
};

module.exports = Participant;