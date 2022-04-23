const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  //origin: "http://93.188.166.97:6082"
  origin: "*"
};

app.use(cors(corsOptions));

const db = require("./app/models");
const Role = db.role;

var client_credential={
  "1234" : {
    "state": false,
    "id":"86714702541",
    "password":"22334455"
  }
}
//development
//db.sequelize.sync({force: true}).then(() => {
//  console.log('Drop and Resync Db');
//  initial();
//});

//production
db.sequelize.sync();

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}
// parse requests of content-type: application/json
app.use(bodyParser.json({ limit: "50mb" }));

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to HakkaiX application." });
});

app.post("/virtual_client_info",(req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Meeting
    const meeting = {
      "key": req.body.key
    };
    res.send(client_credential[req.body.key]);
  });

app.post("/virtual_client_update",(req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    client_credential[req.body.key] =  req.body;
   
    res.send(client_credential[req.body.key]);
  });
// routes

require('./app/routes/participant.routes')(app);
require('./app/routes/meeting_participant.routes')(app);
require('./app/routes/meeting_record.routes')(app);
require('./app/routes/meeting.routes')(app);

// set port, listen for requests
app.listen(6080, () => {
  console.log("Server is running on port 6080.");
});