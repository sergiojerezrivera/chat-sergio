var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = process.env.PORT;
//para que funcione en heroku add "process.env.PORT ||" 


app.use(express.static('client'));
/*
app.get('/hola-mundo', function(req, res){
    res.status(200).send('Hola mundo desde server socket.io');
});
*/
var messages = [{
    id: 1,
    text: 'Welcome to the private chat of Sergio...',
    nickname: 'Bot - Sergio Rivera'
}];

//detect new possible CLIENT connections to our chat
io.on('connection', function(socket){


    console.log("el nodo con IP: "+socket.handshake.address+"se ha conectado");
    
    socket.emit('messages', messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });

});

server.listen(port, function(){
    console.log('Server listening on http://localhost:6677 ');
});