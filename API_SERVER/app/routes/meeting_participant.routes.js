const { authJwt } = require("../middleware");
const meeting_participants = require("../controllers/meeting_participant.controller");

module.exports = 
    function (app) {
            app.use(function (req, res, next) {
            res.header(
                "Access-Control-Allow-Headers",
                "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        });
        

        // Create a new Meeting_participant
        app.post(
            "/meeting_participants",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_participants.create
        );

        // Search Meeting_participants
        app.post(
            "/meeting_participants/search",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_participants.search
        );

        // Retrieve all Meeting_participants
        app.get(
            "/meeting_participants", 
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_participants.findAll
        );

        // Retrieve a single Meeting_participant with meeting_participantId
        app.get(
            "/meeting_participants/:meeting_participantId",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_participants.findOne
         );

        // Update a Meeting_participant with meeting_participantId
        app.put(
            "/meeting_participants/:meeting_participantId",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_participants.update
        );

        // Delete a Meeting_participant with meeting_participantId
        app.delete(
            "/meeting_participants/:meeting_participantId",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_participants.deleteId
        );
        
        // Delete a all Meeting_participants
        app.delete(
            "/meeting_participants",
            //[authJwt.verifyToken, authJwt.isAdmin],
            meeting_participants.deleteAll
        );
};