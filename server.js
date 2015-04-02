var express = require("express"),
	   uuid = require("node-uuid"),
	   path = require("path"),
 		app = express(),
 	 server = require('http').createServer(app),
	players = [],
	  games = ['hey'],
	 	 io = require('socket.io')(server);
		 
server.listen(process.env.PORT || 8000,function (client) {
	console.log('connect and ready on port 8000');
});

var indexPath = path.join(__dirname,'./app');
var staticPath = path.join(__dirname,'./bower_components');

app.use(express.static(indexPath));
app.use(express.static(staticPath));
app.get('/*', function(req, res){
	var file = req.params[0];
	console.log(file);
	res.sendfile(path.join(indexPath, file));
});

var setEventHandlers = function() {
	io.sockets.on("connection",function onconnection (socket){

		socket.emit("connected", {id: socket.id}); 
		players.push({id: socket.id, x: 0, y: 0, gameid: '' , avatar: ''});
		socket.emit("list:game",{list: games, length: games.length});
		socket.on("update:player", updatePlayer);
		socket.on("addToGame:player", addToGame);
		socket.on("new:player", newPlayer);
		socket.on("disconnect", disconnected);
	});
};
setEventHandlers();

function disconnected(){
	var playerIndex  = playerById(this.id);
	if(!playerIndex){
		console.log("Player not found  by this id:"+ this.id);
		return; 
	}
	players.splice(players.indexOf(playerIndex),1);
	console.log('this player has been removed: '+ this.id);

};

function addToGame (data) {
	var player = playerById(data.id);

	if(player.gameid === ''){
		player.gameid = data.gameid;
		this.broadcast.emit("addToGame:player", data)
	}
	console.log('returned value for current player map: '+ player.map);
};

function newPlayer (data){
	console.log(data)
;	var player = playerById(data.id);

	if(!player){

		console.log('player is not found with this id: '+this.id);
	}
	if(!data.gameId){
		console.log(data + ' this');
		console.log('game not found under game list');
	}

	var newPlayer = { id: this.id, x: data.x, y: data.y, gameid: data.gameId , avatar: data.avatar};
	this.broadcast.emit("new:player",{id: newPlayer.id, x: newPlayer.x, y: newPlayer.y, gameid: newPlayer.gameId , avatar: newPlayer.avatar});
	

	var existingPlayer;
	for (var i = 0; i < players.length; i++) {
		existingPlayer = players[i];
		this.emit("new:player", {id: existingPlayer.id, x: existingPlayer.x, y: existingPlayer.y,avatar: existingPlayer.avatar});
	};
};

function updatePlayer(data){
	//updates players movement and status throughout game. 
	console.log(data.id + ' has been updated : '+ data);
	this.broadcast.emit("update:player",data);
};

//helper functions 
function playerById(id) {
	for (var j = 0; j < players.length; j++) {
  		if (players[j].id === id) {
    		return players[j];
  		}
	}
	return false;
};







