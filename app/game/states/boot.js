var Hide = {
	game : null,
	socket : null,
	music : false, 
	player : {id: null, x: 0, y: 0, gameid: null , avatar: null, status: null},
	timer : null,
	games: null
	
};

Hide.Boot = function(game){
	Hide.game = game;
	Hide.socket = io();
	Hide.games = [];
};

Hide.Boot.prototype.init = function () {
	if (Hide.game.device.desktop)
    {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
    Hide.socket.on("connected", function (data){
          Hide.player.id = data.id;
          Hide.games = data.games;
    });
};
Hide.Boot.prototype.preload = function (){
	this.load.image('logo','./assets/take2.png',100,100);
	this.load.image('bar','./assets/loadBar.png',200,10);
};

Hide.Boot.prototype.create = function () {
	this.input.maxPointers = 1;
	Hide.game.stage.backgroundColor = '#292929';
	this.state.start('preload');

};

Hide.Boot.prototype.updateId = function (data) {
	Hide.player.id = data.id; 
	console.log("called "+data);
};

function connected (data){
	Hide.player.id = data.id;
	Hide.games = data.games;
	console.log('there are'+Hide.games.length+ 'games to play');
};
