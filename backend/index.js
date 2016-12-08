var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.set('origins', 'http://localhost:5000'); //change with your website URL

app.get('/', function(req,res) {
    res.send("Hello world!");
});

io.on('connection', function(socket){
    console.log('user connected');

    socket.on('disconnect', function(){
        console.log('disconnected');
    });

    socket.on('post created', function(post, callback){
        console.log('New post: ' + post.title);
        socket.broadcast.emit('new post', post);
        callback(post);
    })
});

http.listen(3000, function(){
    console.log('Listening on port 3000');
});