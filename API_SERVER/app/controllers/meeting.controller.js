const Meeting  = require("../models/meeting.model.js");

// Create and Save a new Meeting
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Meeting
    const meeting = new Meeting({
        meeting_id: req.body.meeting_id,
        start_at: req.body.start_at,
        end_at: req.body.end_at
        
  });

  // Save Meeting in the database
  Meeting.create(meeting, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Meeting."
      });
    else res.send(data);
  });
};

// Search Meeting
exports.search = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // search a Meeting
  //console.log(req.body);
  const meeting = req.body
    
  // search Meeting in the database
  Meeting.search(meeting, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the Meeting."
      });
    else res.send(data);
  });
};

// Retrieve all Meetings from the database.
exports.findAll = (req, res) => {
  Meeting.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving meetings."
      });
    else res.send(data);
  });
};

// Find a single Meeting with a meetingId
exports.findOne = (req, res) => {
  Meeting.findById(req.params.meetingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting with id ${req.params.meetingId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Meeting with id " + req.params.meetingId
        });
      }
    } else res.send(data);
  });
};



// Update a Meeting identified by the meetingId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Meeting.updateById(
        req.params.meetingId,
        new Meeting(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Meeting with id ${req.params.meetingId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Meeting with id " + req.params.meetingId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Meeting with the specified meetingId in the request
exports.deleteId = (req, res) => {
  Meeting.changeStatusById(req.params.meetingId,req.params.status, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting with id ${req.params.meetingId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Meeting with id " + req.params.meetingId
        });
      }
    } else res.send({ message: `Meeting was deleted successfully!` });
  });
};

exports.delete = (req, res) => {
  Meeting.remove(req.params.meetingId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting with id ${req.params.meetingId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Meeting with id " + req.params.meetingId
        });
      }
    } else res.send({ message: `Meeting was deleted successfully!` });
  });
};

// Delete all Meetings from the database.
exports.deleteAll = (req, res) => {
  Meeting.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all meetings."
      });
    else res.send({ message: `All Meetings were deleted successfully!` });
  });
};