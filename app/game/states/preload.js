Hide.Preloader = function(game){};

Hide.Preloader.prototype.preload = function () {
	this.loadbar = Hide.game.add.sprite(Hide.game.world.centerX-100,Hide.game.world.centerY+80,'bar');
  	this.loadbar.anchor.setTo(0);
  	Hide.game.load.setPreloadSprite(this.loadbar);

	this.load.bitmapFont('carrier','./assets/fonts/carrier_command.png','./assets/fonts/carrier_command.xml');
	this.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js');
	//player assets 
	this.load.image('confetti','./assets/confetti.png',50,50);
	this.load.spritesheet('bin','./assets/binladen.png',50,50, 3);
	this.load.spritesheet('hit','./assets/hitler.png',50,50, 3);
	this.load.spritesheet('joe','./assets/joseph.png',50,50, 3);
	this.load.spritesheet('fed','./assets/fidel.png',50,50, 3);
	this.load.spritesheet('kim','./assets/kim.png',50,50, 3);
	//map  assets 
	this.load.image('level_bg','./assets/mansion/level_bg.png',5000,774);
	this.load.image('level_bookshelf_1','./assets/mansion/level_bookshelf_1.png',363,377);
	this.load.image('level_bookshelf_2','./assets/mansion/level_bookshelf_2.png',360,377);
	this.load.image('level_box','./assets/mansion/level_box1.png',129,166);
	this.load.image('level_chair1','./assets/mansion/level_chair1.png',150,150);
	this.load.image('level_chair_2','./assets/mansion/level_chair_2.png',150,150);
	this.load.image('level_curtain','./assets/mansion/level_curtains.png',226,467);
	this.load.image('level_fireplace','./assets/mansion/level_fireplace_.png',304,208);
	this.load.image('level_ground','./assets/mansion/level_ground_.png',4992,28);
	this.load.image('level_knight','./assets/mansion/level_knight.png',219,339);
	this.load.image('level_piano','./assets/mansion/level_piano.png',250,135);
	this.load.image('level_pillar','./assets/mansion/level_pillar_.png',130,777);

	this.load.spritesheet('tooltip','./assets/tooltip.png',50,50,3);
};
Hide.Preloader.prototype.create = function() {
	this.loadbar.cropEnabled = false;
  	Hide.game.stage.backgroundColor = '#A0BFAF';
	this.logo = Hide.game.add.image(Hide.game.world.centerX,Hide.game.world.centerY,'logo');
	this.logo.anchor.setTo(0.5,0.5);
	this.logo.alpha = 0;
	this.titleText = Hide.game.add.bitmapText(Hide.game.world.centerX-65,Hide.game.world.centerY+45,'carrier','TAKE2 STUDIO',10);
  	this.tween = Hide.game.add.tween(this.logo);
  	this.tween.to( { alpha: 1 }, 1000, "Linear", true);
	Hide.game.time.events.add(Phaser.Timer.SECOND * 2, function(){
			this.titleText.alpha = 0;
	    	this.logo.kill();
	    	this.game.state.start('lobby');
	},this);
};

