var Hide = {
	socket : null,
	music : false, 
	player : {id: '', x: 0, y: 0, gameid: '' , avatar: ''},
	timer : null
	
};

Hide.Boot = function(game){
	this.game = game;
	Hide.socket = io();
};

Hide.Boot.prototype.init = function () {
	if (this.game.device.desktop)
    {
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    }
};

Hide.Boot.prototype.create = function () {
	this.input.maxPointers = 1;
	this.game.stage.backgroundColor = '#292929';
	this.state.start('preload');

};
