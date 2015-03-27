(function(){
	var express = require("express"),
		   uuid = require("node-uuid"),
		   path = require("path"),
	 		app = express(),
	 	 server = require('http').createServer(app),
		players = [],
		  games = [],
		 	 io = require('socket.io')(server);
			 
	server.listen(process.env.PORT || 8000,function (client) {
		console.log('connect on port 8000');
	});
	// console.log(__dirname + "/app"); definning the dir needed for site to run
	var indexPath = path.join(__dirname,'./app');
	var staticPath = path.join(__dirname,'./bower_components');

	//give path to answer too
	app.use(express.static(indexPath));
	app.use(express.static(staticPath));
	//responsed to the root 
	app.get('/*', function(req, res){
		var file = req.params[0];
		res.sendfile(path.join(indexPath, file));
	});

	var setEventHandlers = function() {
		io.sockets.on("connection", function(data){
			onSocketConnection(data);
		});
	};

	// New socket connection
	function onSocketConnection(client) {
		console.log("New player has connected: "+client.id);
		// Listen for client disconnected
		client.on("disconnect", function (data) {
			console.log("player has disconnected: "+client.id);
		});
		// Listen for new player message
		client.on("new:player", function (data) {
			var newPlayer = {x: data.x, y: data.y, id: this.id, avatar: data.avatar};

			// Broadcast new player to connected socket clients
			this.broadcast.emit("new:player",{id: newPlayer.id, x: newPlayer.x, y: newPlayer.y,avatar: newPlayer.avatar});
			this.emit("list:game",{games: games, size: games.length});
			// Send existing players to the new player
			var i, existingPlayer;
			for (i = 0; i < players.length; i++) {
				existingPlayer = players[i];
				this.emit("new:player", {id: existingPlayer.id, x: existingPlayer.x, y: existingPlayer.y,avatar: existingPlayer.avatar});
			};

			// Add new player to the players array
			players.push(newPlayer);
			console.log(players);
		});
		client.on('select:character',function (data) {
		  this.broadcast.emit("select:character",{id: newPlayer.id, x: newPlayer.x, y: newPlayer.y,avatar: newPlayer.avatar});
		});
		client.on('load:games',function(data){

		});
		client.on('start:game',function(data){


		});
		client.on("update:player", function (data){
			this.broadcast.emit("update:Player",{x: data.x , y: data.y});
		});
	};
	
	setEventHandlers();
})()





