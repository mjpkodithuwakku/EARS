
var i = 1;                  //  set your counter to 1

function myLoop() {         //  create a loop function
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called
    console.log('hello');   //  your code here
    console.log("Analyser Enabled");
    const div_btn = document.querySelector('.meeting-info-container'); //btns 
    const div_btn_speakers = document.querySelectorAll('.video-avatar__avatar'); //btns 
    //const div_btn_speaker = document.querySelector('.video-avatar__avatar'); //btns 
    const div_names = document.querySelectorAll('.video-avatar__avatar-footer'); //Avatar label 
    const full_screen_btn = document.querySelector('.full-screen-widget__button'); //Full screen button    
    var gallery_view = false;
    
    


    let formData = new FormData();
    let sendNow = false;
    let count = 0;
    div_btn_speakers.forEach(div_btn_speaker => {
        count += 1;
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
            if(div_btn_speaker.childNodes[0] != null){
                if(div_btn_speaker.childNodes[0].childNodes[1] != null){
                    name = div_btn_speaker.childNodes[0].childNodes[1].innerText;
                    console.log(name); 

                }
            }
            
            console.log(div_btn_speaker);
        } 
        
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
    
        console.log("start");
        var delayInMilliseconds = 1000; //1 second
        
        sleep(delayInMilliseconds);
        console.log("done");
       
        const multi_canvas = document.querySelector('.multi-view__canvas'); //Multi view Canvas

        const video_frame = document.querySelector('.speaker-active-container__video-frame'); //Multi view Canvas
        
        if(multi_canvas != null && video_frame != null){
            console.log(parseInt(video_frame.style.width,10));
            console.log(parseInt(video_frame.style.height,10));
            console.log(parseInt(video_frame.style.bottom,10));
            console.log(parseInt(video_frame.style.left,10));
            
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
                parseInt(video_frame.style.left,10),
                //parseInt(video_frame.style.bottom,10),
                120,
                parseInt(video_frame.style.width,10),
                parseInt(video_frame.style.height,10),
                0,
                0,
                parseInt(video_frame.style.width,10),
                parseInt(video_frame.style.height,10)
            );
            if(div_btn_speakers.length == count ){
                sendNow = true;
            }
            
            var stop = true;
            submitformBuilder(name,hidden_canv,formData,sendNow);
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
    formData.append(name, imageBlob, name + "image.jpg");
    if(sendNow){
        submitToServer(formData);
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