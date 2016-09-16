var express = require('express');
var path = require('path');
var Player = require('./js/player');
var app = express();

app.use(express.static(path.join(__dirname, '../client')));

var http = require('http').Server(app);
var io = require('socket.io')(http);

players = {};

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname,'../client/views/index.html'));
});

io.on('connection', function(socket){
	console.log('a user has connected ('+socket.id+')');

	players[socket.id] = new Player(socket.id);
	socket.broadcast.emit('new player',players);

	socket.on('disconnect', function(){
		console.log('user disconnected ('+socket.id+')');
		delete players[socket.id];
	});

	socket.on('move player', function( data ){
		player = players[data.id];
		console.log(player);
		player.updateFromClient( data.vx, data.vy, data.angle );
		player.updatePosition();
		console.log('player moving: '+players[data.id]);
	});
});

function updatePositions(socket){
	socket.broadcast.emit('update positions',players);
}

http.listen(3000, function(){
	console.log('listening on *:3000');
});