const fs = require('fs');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
//const multer = import('multer');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const axios = require('axios');

var Clipper = require('image-clipper');
var Canvas = require('canvas');
var clipper = Clipper();
 
clipper.injectNodeCanvas(Canvas);

var id = 1;
var meetingId = 1;
var obj = {};
var participant_image_dict = {};
var end = null;
var timeNow = null;
var timeNew = null;
var responseData = null;
var lines = null;
const directory = "/home/janith/Desktop/data/images";
const timestamp = "/home/janith/Desktop/data/time_stamp.txt";

const app = express();


var corsOptions = {
    origin: "http://192.168.0.10:9999"
};

app.use(cors(corsOptions));

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log(file);
        callback(null, directory);
    },
    filename: function(req, file, callback) {
        console.log(file);
        //callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
        callback(null, file.originalname);
    }
});
var upload = multer({
    storage: Storage
}).any(); //Field name and max count

app.use(bodyParser.json());

axios
.post('http://93.188.166.97:6080/virtual_client_info', 
    {
        key:'1234'
    }
)
.then(res => {
    console.log(`statusCode3: ${res.status}`)
    console.log(res.data)

    axios
    .post('http://93.188.166.97:6080/meetings/search', 
    {
        "meeting_id": res.data["id"]
    }
    )
    .then(res1 => {
        console.log(`statusCode3: ${res1.status}`)
        console.log(res1.data)
        meetingId = res1.data[0]["id"];
    })
    .catch(error => {
        console.error(error)
    });
})
.catch(error => {
    console.error(error)
});



app.post('/api/1.0/images_upload', (req, res) => {
    var count = 0;
    res.removeHeader("Cross-Origin-Resource-Policy");
    res.removeHeader("Cross-Origin-Embedder-Policy");
    //res.setHeader('Cross-Origin-Embedder-Policy','require-corp');
    
    upload(req, res, function(err) {
        console.log(req.files);
        
        fs.writeFile(timestamp, Date.now(), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The time stamp file was saved!");
        }); 
        if (err) {
            return res.end("Something went wrong!");
        }
        
        fs.readFile('/home/janith/Desktop/data/landmarks.txt', 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              return
            }
            lines = data.toString().split("\n"); 
            console.log(lines[0])
            timeNow = parseInt(lines[0]);
            console.log(timeNow)
        });
        
    });
   
    var checking =  setInterval(function() {
            
            fs.readFile('/home/janith/Desktop/data/landmarks.txt', 'utf8' , (err, data) => {
                if (err) {
                  console.error(err)
                  return
                }
                lines = data.toString().split("\n"); 
               

                //responseData = data.toString();
                //console.log(timeNew)
                lines.pop();
                
                //console.log(end);
                lines.forEach(line => {
                    var parts = line.split("->")
                    if(parts.length < 2){
                        end = parts[0];

                        if (!isNaN(end)){
                            timeNew = parseInt(end);
                            console.log("Time New - > " + end);
                        }
                        else{
                            console.log("The end - >" + end);
                        }
                        
                    }
                    else{
                        var tag = parts[0]
                        var values = parts[1].split(',').map(Number);
                        obj[tag] = values
                    }
                    
                });
            });
            if(timeNew > timeNow && end == "END"){
                console.log("Ok");
            //if(1){
                

                clearInterval(checking);
                
                console.log(obj);
                axios
                //.post('http://192.168.0.10:8080', obj)
                .post('http://0.0.0.0:8080', obj)
                .then(res => {
                  console.log(`statusCode: ${res.status}`)
                  console.log(res.data)
                  var processed_data = JSON.parse(res.data["json_data"]);
                  var out_data = {};
                  var keys = Object.keys(processed_data);
                  keys.forEach(key => {
                    console.log(key);
                    var new_key = key.split("_image.jpg")[0];
                    out_data[new_key] = processed_data[key].slice(0,2);
                    var x = processed_data[key][2];
                    var y = processed_data[key][4];
                    var width = Math.abs(processed_data[key][3] - processed_data[key][2]);
                    var height = Math.abs(processed_data[key][5] - processed_data[key][4]);
                    if(!participant_image_dict.hasOwnProperty(new_key) && processed_data[key][1] == 1){
                        clipper.image(path.join(directory, key), function() {
                            this.crop(x, y, width, height)
                            .resize(75, 100)
                            .quality(80)
                            .toDataURL(function(dataUrl) {
                                console.log('cropped!');
                                console.log(dataUrl);
                                
                                fs.stat(path.join(directory, key), function(error,stat){
                                    if(error == null){
                                        fs.unlink(path.join(directory, key), err => {
                                            if (err) throw err;
                                        });
                                    }
                                    else{
                                        console.log(error.code);
                                    }
                                    
                                });                                
                                axios
                                .post('http://93.188.166.97:6080/participants/search', {
                                    "id": new_key
                                })
                                .then(res2 => {
                                    console.log(`statusCode2: ${res2.status}`)
                                    console.log(res2.data)
                                    var new_data = res2.data[0];
                                    new_data["image"] = dataUrl;
                                    axios
                                    .put('http://93.188.166.97:6080/participants/'+ new_key, 
                                        new_data
                                    )
                                    .then(res3 => {
                                        console.log(`statusCode3: ${res3.status}`)
                                        console.log(res3.data)
                                        participant_image_dict[new_key] = dataUrl;
                                    })
                                    .catch(error => {
                                        console.error(error)
                                    });
                                    axios
                                    .post('http://93.188.166.97:6080/meeting_participants/search', 
                                        {
                                            "meetingId": meetingId,
                                            "participantId": new_key
                                        }
                                    )
                                    .then(res4 => {
                                        console.log(`statusCode4: ${res4.status}`)
                                        console.log(res4.data)
                                        if(res4.data.length == 0){
                                            axios
                                            .post('http://93.188.166.97:6080/meeting_participants', 
                                                {
                                                    "meetingId": meetingId,
                                                    "participantId": new_key
                                                }
                                            )
                                            .then(res5 => {
                                                console.log(`statusCode5: ${res5.status}`)
                                                console.log(res5.data)
                                            })
                                            .catch(error => {
                                                console.error(error)
                                            });
                                        }
                                        
                                    })
                                    .catch(error => {
                                        console.error(error)
                                    });
                                })
                                .catch(error => {
                                    console.error(error)
                                });

                            });
                        });

                    }
                    else{
                        fs.stat(path.join(directory, key), function(error,stat){
                            if(error == null){
                                fs.unlink(path.join(directory, key), err => {
                                    if (err) throw err;
                                });
                            }
                            else{
                                console.log(error.code);
                            }
                            
                        });    

                    }
                  });
                  
                    axios
                    .post('http://93.188.166.97:6080/meeting_records', {
                        "meetingId": meetingId,
                        "json_data":JSON.stringify(out_data)
                    
                    })
                    .then(res1 => {
                    console.log(`statusCode: ${res1.status}`)
                    console.log(res1.data)
                        axios
                        .post('http://93.188.166.97:6080/meetings/search', {
                            "id": meetingId
                        })
                        .then(res2 => {
                        console.log(`statusCode: ${res2.status}`)
                        console.log(res2.data)
                            var data = res2.data[0];
                            var date = new Date();

                            data["end_at"] = date.toISOString().split(".")[0];
                            data["start_at"] = data["start_at"].split(".")[0];
                            axios
                            .put('http://93.188.166.97:6080/meetings/'+ meetingId, 
                                data
                            )
                            .then(res6 => {
                                console.log(`statusCode6: ${res6.status}`)
                                console.log(res6.data)

                            })
                            .catch(error => {
                                console.error(error)
                            });

                        
                        })
                        .catch(error => {
                        console.error(error)
                        });

                    })
                    .catch(error => {
                    console.error(error)
                    });

                })
                .catch(error => {
                  console.error(error)
                });

                
                return res.end(JSON.stringify(obj));
            }
            
            if(count > 10){
                clearInterval(checking);
                fs.readdir(directory, (err, files) => {
                    if (err) throw err;
                  
                   /* for (const file of files) {
                      fs.unlink(path.join(directory, file), err => {
                        if (err) throw err;
                      });
                    }*/
                });
                return res.end("something went wrong..!");
            }
            count += 1
        },100);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));