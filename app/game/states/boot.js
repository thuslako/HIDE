var Hide = {
	music : false, 
	characterid : null,
	
};

Hide.Boot = function(game){};
Hide.Boot.prototype = {

	init : function () {
		if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(600, 400, 1080, 920);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }
	},

	preload: function () {
		
	},

	create: function () {
		this.input.maxPointers = 1;
		this.game.stage.backgroundColor = '#292929';
		this.state.start('preload');
	}
};
