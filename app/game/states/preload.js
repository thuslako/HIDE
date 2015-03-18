Hide.Preloader = function(game){};

Hide.Preloader.prototype = {
	preload: function () {
		this.load.spritesheet('bin','./assets/binladen.png',50,50, 3);
		this.load.spritesheet('hit','./assets/hitler.png',50,50, 3);
		this.load.spritesheet('joe','./assets/joseph.png',50,50, 3);
		this.load.spritesheet('fed','./assets/fidel.png',50,50, 3);
		this.load.spritesheet('kim','./assets/kim.png',50,50, 3);
	},
	update: function() {
		this.game.state.start('lobby', false, false);
	}
};