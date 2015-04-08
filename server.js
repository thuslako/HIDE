var express = require("express"),
	   path = require("path"),
 		app = express(),
 	 server = require('http').createServer(app),
	players = [],
	  items = [],
	  games = ['Demo Game'],
	   rand = 1,
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
	res.sendfile(path.join(indexPath, file));
});

var setEventHandlers = function() {
	io.sockets.on("connection",function onconnection (socket){
		console.log('added new user by:'+socket.id);
		socket.emit("connected", {id: socket.id, games: games}); 
		players.push({id: socket.id, x: 0, y: 0, gameid: null , avatar: null ,status: null});
		socket.on("new:timer", startTimer);
		socket.on("update:player", updatePlayer);
		socket.on("update:item", updateItemsList);
		socket.on("addToQueue:player", addToQueue);
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

function addToQueue (data){
	//increase rand ma and min to hit game size, 
	//due to server load issues game is only running 2 players 
	 rand = Math.floor((Math.random() * 2) + 1);

	var player = playerById(data.id);

	if(!player){
		console.log('no player by id: '+ data.id);
		return;
	}

	var checkname = gameIdByName(data.gameid);
	if(!checkname){
		console.log('no game by that id: '+ data.gameid);
		return;
	}

	player.gameid = data.gameid;
	player.avatar = data.avatar;
	 player.status = 1;
	console.log(rand);
	if(rand == 2){
	  player.status = 2;
	}
	this.emit("user:queue",player);
	this.broadcast.emit("current:queue",player);
	for (var i = 0; i < players.length; i++) {
		if((players[i].id != player.id) && (players[i].gameid == player.gameid)) {
			this.emit("current:queue",players[i]);
			this.broadcast.emit("update:player",players[i]);
		}
	};
};
function startTimer(){
	this.broadcast.emit("start:timer",null);
	console.log("called start:timer");
}

function updatePlayer(data){
	//updates players movement and status throughout game. 
	this.broadcast.emit("update:player",data);
};

function updateItemsList(data){
	//updates players interactions with hiding locations 
	this.broadcast.emit("update:items",data);
};

//helper functions -------------------------------- 

function playerById(id) {
	for (var j = 0; j < players.length; j++) {
  		if (players[j].id === id) {
    		return players[j];
  		}
	}
	return false;
};

function gameIdByName(name){
	for (var i = 0; i < games.length; i++){
		if (games[i] == name){
			return true;
		}
	}
	return false;
};






