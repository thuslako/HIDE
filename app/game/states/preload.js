Hide.Preloader = function(game){};

Hide.Preloader.prototype.preload = function () {
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
	this.load.image('level_box1','./assets/mansion/level_box1.png',129,166);
	this.load.image('level_chair1','./assets/mansion/level_chair1.png',150,150);
	this.load.image('level_chair_2','./assets/mansion/level_chair_2.png',150,150);
	this.load.image('level_curtains','./assets/mansion/level_curtains.png',226,467);
	this.load.image('level_fireplace','./assets/mansion/level_fireplace_.png',304,208);
	this.load.image('level_ground','./assets/mansion/level_ground_.png',4992,28);
	this.load.image('level_knight','./assets/mansion/level_knight.png',219,339);
	this.load.image('level_piano','./assets/mansion/level_piano.png',250,135);
	this.load.image('level_pillar','./assets/mansion/level_pillar_.png',130,777);
};
Hide.Preloader.prototype.update = function() {
	this.game.state.start('lobby', false, false);
};

