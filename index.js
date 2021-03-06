var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path=require('path');

app.get('/', function(req, res){
  res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });


  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message',msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

//TODO
/*
    Broadcast a message to connected users when someone connects or disconnects
    Add support for nicknames
    Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
    Add “{user} is typing” functionality
    Show who’s online
    Add private messaging
    Share your improvements!
*/