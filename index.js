document.onkeydown = updateKey;
document.onkeyup = resetKey;

var server_port = 65432;
var server_addr = "192.168.1.44";   // the IP address of your Raspberry PI
var start_get_info = false
var interval_timer = null

function client(){
    
    const net = require('net');
    var input = document.getElementById("message").value;

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${input}\r\n`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        document.getElementById("bluetooth").innerHTML = data;
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });


}


function send_data(direction) {
    
    const net = require('net');
    // var input = document.getElementById("message").value;

    const client = net.createConnection({ port: server_port, host: server_addr }, () => {
        // 'connect' listener.
        console.log('connected to server!');
        // send the message
        client.write(`${direction}\r\n`);
    });
    
    // get the data from the server
    client.on('data', (data) => {
        const filtered_data = JSON.parse(data);
        document.getElementById("moving").innerHTML = filtered_data.moving;
        document.getElementById("turning").innerHTML = filtered_data.turning;
        document.getElementById("speed").innerHTML = filtered_data.speed;
        document.getElementById("distance").innerHTML = filtered_data.distance;
        document.getElementById("temp").innerHTML = filtered_data.temp;
        // document.getElementById("bluetooth").innerHTML = data;
        console.log(data.toString());
        client.end();
        client.destroy();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });
}

// for detecting which key is been pressed up,Down,left, down arrow
function updateKey(e) {

    e = e || window.event;
    start();

    if (e.keyCode == '38') {
        // up 
        document.getElementById("upArrow").style.color = "blue";
        send_data("fw");
    }
    else if (e.keyCode == '40') {
        // down 
        document.getElementById("downArrow").style.color = "blue";
        send_data("bk");
    }
    else if (e.keyCode == '37') {
        // left 
        document.getElementById("leftArrow").style.color = "blue";
        send_data("lt");
    }
    else if (e.keyCode == '39') {
        // right 
        document.getElementById("rightArrow").style.color = "blue";
        send_data("rt");

    }
	else if (e.keyCode == '83') {
        // stop (s)
        document.getElementById("leftArrow").style.color = "blue";
        send_data("stop");
    }
}

// start
function start() {
    if (!start_get_info)
    {
        interval_timer = setInterval(function() {
            send_data("get_info");
        }, 500);
        start_get_info = true
    }
}

// stop
function stop(){
    send_data("stop");
    if (interval_timer)
    {
        clearInterval(interval_timer);
    }

    start_get_info = false
    //document.getElementById("moving").innerHTML = "";
    //document.getElementById("turning").innerHTML = "";
    //document.getElementById("speed").innerHTML = "";
    //document.getElementById("distance").innerHTML = "";
    //document.getElementById("temp").innerHTML = "";
}
function sendfw(){
	    start(); 
        document.getElementById("upArrow").style.color = "green";
        send_data("fw");
		document.getElementById("downArrow").style.color = "grey";
		document.getElementById("leftArrow").style.color = "grey";
		document.getElementById("rightArrow").style.color = "grey";
}
function sendbk(){
	    start; 
        document.getElementById("downArrow").style.color = "green";
        send_data("bk");
		document.getElementById("upArrow").style.color = "grey";
		document.getElementById("leftArrow").style.color = "grey";
		document.getElementById("rightArrow").style.color = "grey";
}
function sendlt(){
	    start(); 
        document.getElementById("leftArrow").style.color = "green";
        send_data("lt");
		document.getElementById("upArrow").style.color = "grey";
		document.getElementById("downArrow").style.color = "grey";
		document.getElementById("rightArrow").style.color = "grey";
}
function sendrt(){
	    start(); 
        document.getElementById("rightArrow").style.color = "green";
        send_data("rt");
		document.getElementById("upArrow").style.color = "grey";
		document.getElementById("downArrow").style.color = "grey";
		document.getElementById("leftArrow").style.color = "grey";

}
// reset the key to the start state 
function resetKey(e) {

    e = e || window.event;

    document.getElementById("upArrow").style.color = "grey";
    document.getElementById("downArrow").style.color = "grey";
    document.getElementById("leftArrow").style.color = "grey";
    document.getElementById("rightArrow").style.color = "grey";
}


// update data for every 50ms
function update_data(){
//    setInterval(function(){
//        // get image from python server
//        client();
//    }, 50);
}
