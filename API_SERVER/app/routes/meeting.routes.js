const { authJwt } = require("../middleware");
const meetings = require("../controllers/meeting.controller");

module.exports = 
    function (app) {
            app.use(function (req, res, next) {
            res.header(
                "Access-Control-Allow-Headers",
                "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        });
        

        // Create a new Meeting
        app.post(
            "/meetings",
            //[authJwt.verifyToken, authJwt.isModerator],
            meetings.create
        );

        // Search Meetings
        app.post(
            "/meetings/search",
            //[authJwt.verifyToken, authJwt.isModerator],
            meetings.search
        );

        // Retrieve all Meetings
        app.get(
            "/meetings", 
            //[authJwt.verifyToken, authJwt.isModerator],
            meetings.findAll
        );

        // Retrieve a single Meeting with meetingId
        app.get(
            "/meetings/:meetingId",
            //[authJwt.verifyToken, authJwt.isModerator],
            meetings.findOne
         );

        // Update a Meeting with meetingId
        app.put(
            "/meetings/:meetingId",
            //[authJwt.verifyToken, authJwt.isModerator],
            meetings.update
        );

        // Delete a Meeting with meetingId
        app.delete(
            "/meetings/:meetingId",
            //[authJwt.verifyToken, authJwt.isModerator],
            //meetings.deleteId
            meetings.delete
        );
        
        // Delete a all Meetings
        app.delete(
            "/meetings",
            //[authJwt.verifyToken, authJwt.isAdmin],
            meetings.deleteAll
        );
};