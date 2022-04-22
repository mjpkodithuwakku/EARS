
var i = 1;                  //  set your counter to 1
var dict = {

};
function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    console.log('hello');   //  your code here
    console.log("Analyser Enabled");
 
    //joining automatically
    const join_btn = document.querySelector('.joinWindowBtn'); //btns
    if(join_btn != null){
        join_btn.click();
    }

    console.log(join_btn);
    const div_btn = document.querySelector('.meeting-info-container'); //btns 
    const div_btn_speakers = document.querySelectorAll('.video-avatar__avatar'); //btns 
    //const div_btn_speaker = document.querySelector('.video-avatar__avatar'); //btns 
    const div_names = document.querySelectorAll('.video-avatar__avatar-footer'); //Avatar label 
    const full_screen_btn = document.querySelector('.full-screen-widget__button'); //Full screen button    
    var gallery_view = false;

    let formData = new FormData();
    let sendNow = false;
    let count = 0;

    if(full_screen_btn != null){
        
        //console.log(full_screen_btn);
        if(full_screen_btn.firstChild.getAttribute("class") == "full-screen-widget--gallery-icon"){
            console.log("its okay..!");
        }
        else{
            full_screen_btn.click();
            console.log("its not okay..!");
            sleep(500);
            console.log("its not okay after..!");
            
            
        }
        
        const div_pop_menu = document.querySelector('.full-screen-widget__pop-menu'); //btns
        if(div_pop_menu != null){
            var mennu_lis = div_pop_menu.getElementsByTagName("li");
                
                Array.from(mennu_lis).forEach(li_name => {
                   
                    //console.log(li_name);
                    if(li_name.firstChild != null){
                        if(li_name.firstChild.getAttribute("aria-label")=="Gallery View"){
                            //console.log(li_name);
                            
                            li_name.firstChild.click();
                            gallery_view = true;
                        }
                    }
                   
                });
            }
    }

    div_btn_speakers.forEach(div_btn_speaker => {
        
        var hidden_canv = document.createElement('canvas');
        hidden_canv.style.display = 'none';
        document.body.appendChild(hidden_canv);


        var name = "";


        var event = new MouseEvent('mouseover', {
            'view': window,
            'bubbles': true,
            'cancelable': true
            });
        
        if(div_btn_speaker != null){
            div_btn_speaker.dispatchEvent(event);
            const footer = div_btn_speaker.getElementsByClassName('video-avatar__avatar-footer');
            console.log(footer.length);
            if(footer.length != 0){
                
                /*if(div_btn_speaker.childNodes[0].childElementCount == 2){
                    if(div_btn_speaker.childNodes[0].childNodes[1] != null){
                        name = div_btn_speaker.childNodes[0].childNodes[1].innerText;       //aftersound connect
                        console.log("f_1");
                    }
                    else if(div_btn_speaker.childNodes[1] != null){
                        if(div_btn_speaker.childNodes[1].childElementCount == 2){
                            if(div_btn_speaker.childNodes[1].childNodes[1] != null){
                                name = div_btn_speaker.childNodes[1].childNodes[1].innerText;       //aftersound connect
                                console.log("f_2");
                            }
                        }
                        else{
                            if(div_btn_speaker.childNodes[1].childNodes[0] != null){
                                name = div_btn_speaker.childNodes[1].childNodes[0].innerText;       //aftersound connect
                                console.log("f_3");
                            }
                        }
                    }
                }
                else{
                    if(div_btn_speaker.childNodes[1].childNodes[1] != null){
                        name = div_btn_speaker.childNodes[1].childNodes[1].innerText;       //before sound connect
                        console.log("f_4");
                    }
                }
                */
                console.log(footer[0].childElementCount); 
                const nameTag = footer[0].getElementsByTagName('span');
                if(nameTag != null){
                    name = nameTag[0].innerText;       //aftersound connect
                    console.log("f_1");
                }
                console.log(name); 

                
            }
            
            console.log(div_btn_speaker);
        } 
        /*
        const dropdown_div = document.querySelector('.avatar-more'); //Full screen button

        if(dropdown_div != null){
            dropdown_div.firstChild.firstChild.click();
            console.log(dropdown_div); // true
            
            var lis = dropdown_div.getElementsByTagName("li");
            
            Array.from(lis).forEach(li_name => {
                var li_text=li_name.innerText;
                if(li_text=="Add Pin"){
                    console.log(li_name);
                    console.log(li_text);
                    //li_name.firstChild.click();
                }
                else if(li_text=="Replace Pin"){
                    console.log(li_name);
                    console.log(li_text);
                    //li_name.firstChild.click();
                }
            });
            
        }
    */
        //console.log("start");
        //var delayInMilliseconds = 500; //100 msecond
        
        //sleep(delayInMilliseconds);
        //console.log("done");
       
        const multi_canvas = document.querySelector('.multi-view__canvas'); //Multi view Canvas

        //const video_frame = document.querySelector('.gallery-video-container__video-frame'); //Multi view Canvas
        const video_frame = div_btn_speaker.parentElement;
        
        if(multi_canvas != null && video_frame != null){
            console.log(parseInt(video_frame.style.width,10));
            console.log(parseInt(video_frame.style.height,10));
            
            const style = window.getComputedStyle(video_frame);
            const matrix = style.transform;
            
            //while(matrix == null);
            console.log(matrix);
            if(matrix.match(/matrix.*\((.+)\)/) != null){
                const matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
            
                console.log( matrixValues[4]);
                console.log( matrixValues[5]);
            
                
                //submitToServer();
                var hidden_ctx = hidden_canv.getContext('2d');
                hidden_canv.width = parseInt(video_frame.style.width,10);
                hidden_canv.height = parseInt(video_frame.style.height,10);
                /*hidden_ctx.drawImage(
                    multi_canvas,
                    video_frame.style.left,
                    video_frame.style.height - video_frame.style.bottom,
                    video_frame.style.width,
                    video_frame.style.height,
                    0,
                    0,
                    video_frame.style.width,
                    video_frame.style.height
                );*/
                hidden_ctx.drawImage(
                    multi_canvas,
                    matrixValues[4],    //X
                    matrixValues[5],    //Y
                    parseInt(video_frame.style.width,10),
                    parseInt(video_frame.style.height,10),
                    0,
                    0,
                    parseInt(video_frame.style.width,10),
                    parseInt(video_frame.style.height,10)
                );
            }
            
            
            
            var stop = true;
            submitformBuilder(name,hidden_canv,formData,sendNow).then(function(){ 
                count += 1;
                if(div_btn_speakers.length == count ){
                    sendNow = true;
                    submitToServer(formData);
                }
        });
            //var image = hidden_canv.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
            //window.location.href=image; // it will save locally
            console.log(video_frame);
        }
        
        
       
       
        
    
        // div_names.forEach(div_name => {
    //     if(div_name != null){
    //         div_name.style.display = "none";
    //         console.log(div_name.childNodes[1].innerText); // true
    //         console.log(div_name);
    //     }
    // });

    });

    

    if(div_btn != null){
        div_btn.style.display = "none";
        console.log(div_btn); // true
    }
    
    
    i++;                    //  increment the counter
    if (i < 100) {           //  if the counter < 10, call the loop function
      myLoop();             //  ..  again which will trigger another 
    }                       //  ..  setTimeout()
  }, 5000)
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    /*do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);*/
  }
myLoop();  
async function submitformBuilder(name,hidden_canv,formData,sendNow) {
    
    //let imageBlob = await new Promise(resolve => multi_canvas.toBlob(resolve, 'image/png'));
    let imageBlob = await new Promise(resolve => hidden_canv.toBlob(resolve, 'image/jpg'));
    hidden_canv.remove();
    
    console.log(imageBlob);
    
    if(!dict.hasOwnProperty(name)){
        var participantData = {
            "name":name
        }
        axios.post('http://93.188.166.97:6080/participants/search',participantData)
        .then((res) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
            if(res.data.length == 0){
                var newParticipantData = {
                    "name": name,
                    "image": "imageBlob"
                }
                axios.post('http://93.188.166.97:6080/participants',newParticipantData)
                .then((res1) => {
                    console.log(`Status: ${res1.status}`);
                    console.log('Body: ', res1.data);
                    dict[name] = res1.data["id"];
                    formData.append(name, imageBlob, dict[name] + "_image.jpg");
                    var newMeeting_ParticipantData = {
                        "meetingId":1,
                        "participantId":res1.data["id"]
                    }
                    /*axios.post('http://93.188.166.97:6080/meeting_participants',newMeeting_ParticipantData)
                    .then((res2) => {
                        console.log(`Status2: ${res2.status}`);
                        console.log('Body2: ', res2.data);          
                    }).catch((err) => {
                        console.error(err);
                    });   */           
                }).catch((err) => {
                    console.error(err);
                });
            }
            else{
                dict[name] = res.data[0]["id"];
                formData.append(name, imageBlob, dict[name] + "_image.jpg");
            }
            
        }).catch((err) => {
            console.error(err);
        });
    }
    else{
        formData.append(name, imageBlob, dict[name] + "_image.jpg");
    }
    
}

async function submitToServer(formData) {
    
    
    //console.log(formData.keys());
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
    let headers = new Headers();

    
    //headers.append('Access-Control-Allow-Origin','http://127.0.0.1:9999');
    //headers.append('Access-Control-Allow-Credentials', 'true');
    
    let response = await fetch('http://192.168.0.17:3000/api/1.0/images_upload', {
    method: 'POST',
    headers: headers,
    mode: 'no-cors',
    credentials: 'include',
    body: formData
    });
    let result = await response.json();
    //var xhr = new XMLHttpRequest();
    //xhr.open("POST", 'http://192.168.0.16:3000/api/1.0/images_upload', true);
    
    //xhr.setRequestHeader('Access-Control-Allow-Origin','http://127.0.0.1:9999');
    //xhr.setRequestHeader('Accept','application/json');
    //xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.send(JSON.stringify({
    //    value: formData
    //}));
}