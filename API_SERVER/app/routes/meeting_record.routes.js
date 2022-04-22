const { authJwt } = require("../middleware");
const meeting_records = require("../controllers/meeting_record.controller");

module.exports = 
    function (app) {
            app.use(function (req, res, next) {
            res.header(
                "Access-Control-Allow-Headers",
                "x-access-token, Origin, Content-Type, Accept"
            );
            next();
        });
        

        // Create a new Meeting_record
        app.post(
            "/meeting_records",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_records.create
        );

        // Search Meeting_records
        app.post(
            "/meeting_records/search",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_records.search
        );

        // Retrieve all Meeting_records
        app.get(
            "/meeting_records", 
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_records.findAll
        );

        // Retrieve a single Meeting_record with meeting_recordId
        app.get(
            "/meeting_records/:meeting_recordId",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_records.findOne
         );

        // Update a Meeting_record with meeting_recordId
        app.put(
            "/meeting_records/:meeting_recordId",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_records.update
        );

        // Delete a Meeting_record with meeting_recordId
        app.delete(
            "/meeting_records/:meeting_recordId",
            //[authJwt.verifyToken, authJwt.isModerator],
            meeting_records.deleteId
        );
        
        // Delete a all Meeting_records
        app.delete(
            "/meeting_records",
            //[authJwt.verifyToken, authJwt.isAdmin],
            meeting_records.deleteAll
        );
};