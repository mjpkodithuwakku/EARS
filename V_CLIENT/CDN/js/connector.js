async function submitToServer() {
    console.log("running");

    const data = {
        key: '1234'
    };
    waiting = false;
    axios.post('http://93.188.166.97:6080/virtual_client_info', data)
        .then((res) => {
            console.log(`Status: ${res.status}`);
            console.log('Body: ', res.data);
            meeting_data = res.data;
            
            if(meeting_data.state == "on"){
                
                console.log(meeting_data)

                const display_name = document.getElementById("display_name");
                console.log(display_name);
                if(display_name != null){
                    display_name.value = data.key;
                }
                const meeting_number = document.getElementById("meeting_number");
                console.log(meeting_number);
                if(meeting_number != null){
                    meeting_number.value = meeting_data.id;
                }
                const meeting_pwd = document.getElementById("meeting_pwd");
                console.log(meeting_pwd);
                if(meeting_pwd != null){
                    meeting_pwd.value = meeting_data.password;
                }
                const join_btn = document.getElementById("join_meeting");
                console.log(join_btn);
                if(join_btn != null){
                    join_btn.click();
                }
                
            }
        else{
            waiting = true;
            myLoop();
        }
        }).catch((err) => {
            console.error(err);
        });
}
var waiting = true;
function myLoop() { 

    setTimeout(function() {
    submitToServer();                  //  increment the counter
    console.log(waiting)
    if(waiting) {           //  if the counter < 10, call the loop function
        myLoop();             //  ..  again which will trigger another 
    }      
  
}, 10000)
}
myLoop();