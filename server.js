var express = require("express"),
	   uuid = require("node-uuid"),
	   path = require("path"),
 		app = express(),
 	 server = require('http').createServer(app),
	players = [],
	  items = [],
	  games = ['Demo Game'],
	   rand = 0,
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

		socket.emit("connected", {id: socket.id, games: games}); 
		players.push({id: socket.id, x: 0, y: 0, gameid: null , avatar: '',status:''});
		console.log('added :'+socket.id);


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
	 rand = Math.floor((Math.random() * 2) + 1);
	//takes all players with going into the same game and sync their game
	//makes on person it, ensure there's the right amount of people there
	//updates if people leave queue
	var player = playerById(data.id);

	if(!player){
		console.log('no player by id: '+ data.id);
		return;
	}

	var checkname = mapidByName(data.gameid);
	if(!checkname){
		console.log('no game by that id: '+ data.gameid);
		return;
	}

	player.gameid = data.gameid;
	player.avatar = data.avatar;
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

function updatePlayer(data){
	//updates players movement and status throughout game. 
	this.broadcast.emit("update:player",data);
};


function updateItemsList(data){
	console.log(data);
	console.log(data.key)
	this.broadcast.emit("update:items",data);
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

function mapidByName(name){
	for (var i = 0; i < games.length; i++){
		if (games[i] == name){
			return true;
		}
	}
	return false;
};






