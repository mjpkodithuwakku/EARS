const { authJwt } = require("../middleware");
const participants = require("../controllers/participant.controller");

module.exports = 
    function (app) {
            app.use(function (req, res, next) {
            res.header(
                "Access-Control-Allow-Headers",
                "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        });
        

        // Create a new Participant
        app.post(
            "/participants",
            //[authJwt.verifyToken, authJwt.isModerator],
            participants.create
        );

        // Search Participants
        app.post(
            "/participants/search",
            //[authJwt.verifyToken, authJwt.isModerator],
            participants.search
        );

        // Retrieve all Participants
        app.get(
            "/participants", 
            //[authJwt.verifyToken, authJwt.isModerator],
            participants.findAll
        );

        // Retrieve a single Participant with participantId
        app.get(
            "/participants/:participantId",
            //[authJwt.verifyToken, authJwt.isModerator],
            participants.findOne
         );

        // Update a Participant with participantId
        app.put(
            "/participants/:participantId",
            //[authJwt.verifyToken, authJwt.isModerator],
            participants.update
        );

        // Delete a Participant with participantId
        app.delete(
            "/participants/:participantId",
            //[authJwt.verifyToken, authJwt.isModerator],
            participants.deleteId
        );
        
        // Delete a all Participants
        app.delete(
            "/participants",
            //[authJwt.verifyToken, authJwt.isAdmin],
            participants.deleteAll
        );
};