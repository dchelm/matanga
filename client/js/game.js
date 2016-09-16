
var WIDTH = 800;
var HEIGHT = 600;
var VELOCITY = 10;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'game', { 
	preload: preload, 
	create: create, 
	update: update 
});

var upKey;
var downKey;
var leftKey;
var rightKey;
var socket;
var Players = {};

function preload(){
}

function create(){
	socket = io.connect();
    game.stage.backgroundColor = '#f5f5f5';

    upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);

	setEventHandlers();

	game.time.events.loop(100, updateOnTick, this)
}

var setEventHandlers = function() {
	socket.on('connect', onConnect );
	socket.on('disconnect', onDisconnect );
	socket.on('new player', onNewPlayer );
	socket.on('move player', onMovePlayer );
	socket.on('remove player', onRemovePlayer );
	socket.on('update positions', onUpdatePositions );
}

function onConnect(){
	console.log('onConnect');
}

function onDisconnect(){
	console.log('onDisconnect');
}

function onNewPlayer(){
	console.log('onNewPlayer');
}

function onMovePlayer(){
	console.log('onMovePlayer');
}

function onRemovePlayer(){
	console.log('onRemovePlayer');
}

function onUpdatePositions(players){
	console.log('onUpdatePositions');
}

function update(){
	//console.log('update');
}

function updateOnTick(){
	var velX = 0;
	var velY = 0;
	var angle = 0;

	if(upKey.isDown){
		velY += VELOCITY;
	}
	if(downKey.isDown){
		velY -= VELOCITY;
	}	
	if(leftKey.isDown){
		velX -= VELOCITY;
	}
	if(rightKey.isDown){
		velX += VELOCITY;
	}
	if(velX != 0 || velY != 0){
		console.log('updating player');
		socket.emit('move player', { id:socket.id, vx: velX, vy:velY, angle:angle });
	}
}