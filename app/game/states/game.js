Hide.Game = function (game){
	 this.game = game;
	 this.player;
	 this.remote;
 	 this.socket = io();
};

Hide.Game.prototype = {
	
	create : function () {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		Hide.g = this.game;
		this.player = new Hide.Player(Hide.characterid.id,Hide.characterid.x,Hide.characterid.y,Hide.characterid.avatar,this.game);
		this.player.create();
		this.socket.on('new:player',this.newPlayer); 
	},
	update : function () {
		this.player.input();
	},
	newPlayer : function (data) {
		console.log(data);
		console.log(Hide.g);
		this.remote = new Hide.Player(data.id,data.x,data.y,data.avatar,Hide.g);
		this.remote.create(); 
	}

};


