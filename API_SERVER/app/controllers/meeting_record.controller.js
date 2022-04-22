const Meeting_record  = require("../models/meeting_record.model.js");

// Create and Save a new Meeting_record
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Meeting_record
    const meeting_record = new Meeting_record({
      meetingId: req.body.meetingId,
      json_data: req.body.json_data,
      create_at: req.body.create_at
        
  });

  // Save Meeting_record in the database
  Meeting_record.create(meeting_record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Meeting_record."
      });
    else res.send(data);
  });
};

// Search Meeting_record
exports.search = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // search a Meeting_record
  //console.log(req.body);
  const meeting_record = req.body
    
  // search Meeting_record in the database
  Meeting_record.search(meeting_record, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the Meeting_record."
      });
    else res.send(data);
  });
};

// Retrieve all Meeting_records from the database.
exports.findAll = (req, res) => {
  Meeting_record.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving meeting_records."
      });
    else res.send(data);
  });
};

// Find a single Meeting_record with a meeting_recordId
exports.findOne = (req, res) => {
  Meeting_record.findById(req.params.meeting_recordId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting_record with id ${req.params.meeting_recordId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Meeting_record with id " + req.params.meeting_recordId
        });
      }
    } else res.send(data);
  });
};



// Update a Meeting_record identified by the meeting_recordId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Meeting_record.updateById(
        req.params.meeting_recordId,
        new Meeting_record(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Meeting_record with id ${req.params.meeting_recordId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Meeting_record with id " + req.params.meeting_recordId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Meeting_record with the specified meeting_recordId in the request
exports.deleteId = (req, res) => {
  Meeting_record.changeStatusById(req.params.meeting_recordId,req.params.status, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting_record with id ${req.params.meeting_recordId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Meeting_record with id " + req.params.meeting_recordId
        });
      }
    } else res.send({ message: `Meeting_record was deleted successfully!` });
  });
};

exports.delete = (req, res) => {
  Meeting_record.remove(req.params.meeting_recordId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting_record with id ${req.params.meeting_recordId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Meeting_record with id " + req.params.meeting_recordId
        });
      }
    } else res.send({ message: `Meeting_record was deleted successfully!` });
  });
};

// Delete all Meeting_records from the database.
exports.deleteAll = (req, res) => {
  Meeting_record.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all meeting_records."
      });
    else res.send({ message: `All Meeting_records were deleted successfully!` });
  });
};