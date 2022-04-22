const Participant  = require("../models/participant.model.js");

// Create and Save a new Participant
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Participant
    const participant = new Participant({
        name: req.body.name,
        image: req.body.image
        
  });

  // Save Participant in the database
  Participant.create(participant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Participant."
      });
    else res.send(data);
  });
};

// Search Participant
exports.search = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // search a Participant
  //console.log(req.body);
  const participant = req.body
    
  // search Participant in the database
  Participant.search(participant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the Participant."
      });
    else res.send(data);
  });
};

// Retrieve all Participants from the database.
exports.findAll = (req, res) => {
  Participant.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving participants."
      });
    else res.send(data);
  });
};

// Find a single Participant with a participantId
exports.findOne = (req, res) => {
  Participant.findById(req.params.participantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Participant with id ${req.params.participantId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Participant with id " + req.params.participantId
        });
      }
    } else res.send(data);
  });
};



// Update a Participant identified by the participantId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Participant.updateById(
        req.params.participantId,
        new Participant(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Participant with id ${req.params.participantId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Participant with id " + req.params.participantId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Participant with the specified participantId in the request
exports.deleteId = (req, res) => {
  Participant.changeStatusById(req.params.participantId,req.params.status, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Participant with id ${req.params.participantId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Participant with id " + req.params.participantId
        });
      }
    } else res.send({ message: `Participant was deleted successfully!` });
  });
};

exports.delete = (req, res) => {
  Participant.remove(req.params.participantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Participant with id ${req.params.participantId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Participant with id " + req.params.participantId
        });
      }
    } else res.send({ message: `Participant was deleted successfully!` });
  });
};

// Delete all Participants from the database.
exports.deleteAll = (req, res) => {
  Participant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all participants."
      });
    else res.send({ message: `All Participants were deleted successfully!` });
  });
};