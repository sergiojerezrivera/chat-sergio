//var socket = io.connect('http://192.168.0.22:6677', {'forceNew':true});
var port = process.env.PORT;
var socket = io.connect(port+1);
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return(`
            <div class="message">
                <strong>${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

   var div_msgs = document.getElementById('messages');
   div_msgs.innerHTML = html;
   div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    //clear values from the text box
    document.getElementById('text').value = "";
    socket.emit('add-message', message);


    return false;
}