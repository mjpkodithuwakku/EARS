const Meeting_participant  = require("../models/meeting_participant.model.js");

// Create and Save a new Meeting_participant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Meeting_participant
    const meeting_participant = new Meeting_participant({
      meetingId : req.body.meetingId ,
      participantId : req.body.participantId 
        
  });

  // Save Meeting_participant in the database
  Meeting_participant.create(meeting_participant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Meeting_participant."
      });
    else res.send(data);
  });
};

// Search Meeting_participant
exports.search = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // search a Meeting_participant
  //console.log(req.body);
  const meeting_participant = req.body
    
  // search Meeting_participant in the database
  Meeting_participant.search(meeting_participant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the Meeting_participant."
      });
    else res.send(data);
  });
};

// Retrieve all Meeting_participants from the database.
exports.findAll = (req, res) => {
  Meeting_participant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving meeting_participants."
      });
    else res.send(data);
  });
};

// Find a single Meeting_participant with a meeting_participantId
exports.findOne = (req, res) => {
  Meeting_participant.findById(req.params.meeting_participantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting_participant with id ${req.params.meeting_participantId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Meeting_participant with id " + req.params.meeting_participantId
        });
      }
    } else res.send(data);
  });
};



// Update a Meeting_participant identified by the meeting_participantId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Meeting_participant.updateById(
        req.params.meeting_participantId,
        new Meeting_participant(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Meeting_participant with id ${req.params.meeting_participantId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Meeting_participant with id " + req.params.meeting_participantId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Meeting_participant with the specified meeting_participantId in the request
exports.deleteId = (req, res) => {
  Meeting_participant.changeStatusById(req.params.meeting_participantId,req.params.status, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting_participant with id ${req.params.meeting_participantId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Meeting_participant with id " + req.params.meeting_participantId
        });
      }
    } else res.send({ message: `Meeting_participant was deleted successfully!` });
  });
};

exports.delete = (req, res) => {
  Meeting_participant.remove(req.params.meeting_participantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Meeting_participant with id ${req.params.meeting_participantId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Meeting_participant with id " + req.params.meeting_participantId
        });
      }
    } else res.send({ message: `Meeting_participant was deleted successfully!` });
  });
};

// Delete all Meeting_participants from the database.
exports.deleteAll = (req, res) => {
  Meeting_participant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all meeting_participants."
      });
    else res.send({ message: `All Meeting_participants were deleted successfully!` });
  });
};