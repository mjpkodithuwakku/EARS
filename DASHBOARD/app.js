const http = require("http");
const fs = require('fs').promises;
var Chart = require('chart.js');

const host = '0.0.0.0';
const port = 9090;

const requestListener = function (req, res) {
    res.setHeader("Content-Type", "application/json");
    switch (req.url) {
        case "/books":
            fs.readFile(__dirname + "/index.html")
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
            break

        case "/chart":
            fs.readFile(__dirname + "/chart.html")
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
            break  
            
        case "/dashboard":
            fs.readFile(__dirname + "/dashboard.html")
            .then(contents => {
                res.setHeader("Content-Type", "text/html");
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
            break      

        default:
            res.writeHead(404);
            res.end(JSON.stringify({error:"Resource not found"}));
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World');
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });