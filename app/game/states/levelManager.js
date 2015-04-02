Hide.LevelManager = function (game){
	 Hide.game = game; 
	 this.player,
	 this.pillars,
	 this.pillar,
	 this.chairs,
	 this.chair,
	 this.background,
	 this.tween,
	 this.updates,
	 this.remote = null;
};

Hide.LevelManager.prototype.create = function () {
	Hide.game.physics.startSystem(Phaser.Physics.ARCADE);
	Hide.game.world.setBounds(0,0,2500,400);

	this.background = Hide.game.add.sprite(0,3,'level_bg');
	this.background.scale.setTo(0.5, 0.5);

	this.chairs = Hide.game.add.group();
	this.chairs.enableBody = true;
	this.chair = this.chairs.create(220,315,'level_chair1');
	this.chair.scale.setTo(0.5,0.5);
	this.chair = this.chairs.create(420,315,'level_chair_2');
	this.chair.scale.setTo(0.5,0.5);

	this.ground = Hide.game.add.sprite(0,385,'level_ground');
	Hide.game.physics.arcade.enable([this.ground]);
	this.ground.scale.setTo(0.6, 0.6);
	this.ground.immovable = true;

	this.player = new Player({id:1, mapid: 24, avatar: 'fed',game : Hide.game});
	this.player.create();
	Hide.game.physics.arcade.enable([this.player.player]);
	Hide.game.camera.follow(this.player.player);


	this.remote = Hide.remote= new Player({id:1, mapid: 24, avatar: 'joe',game : Hide.game}); 
	this.remote.create();
	Hide.socket.on('new:player',this.newPlayer); 

	this.pillars = Hide.game.add.group();
	this.pillars.enableBody = true;

	this.pillar = this.pillars.create(650,201,'level_pillar');
	this.pillar.scale.setTo(0.5, 0.52);
	this.pillar.anchor.setTo(0.5, 0.5);

	this.pillar = this.pillars.create(1600,201,'level_pillar');
	this.pillar.scale.setTo(0.5, 0.52);
	this.pillar.anchor.setTo(0.5, 0.5);


};

Hide.LevelManager.prototype.update = function () {	
	this.player.input();
 	Hide.socket.on("update:player",function (data) {
		return moveUpdates(data);
	});
};

Hide.LevelManager.prototype.render = function (){

};	
Hide.LevelManager.prototype.newPlayer = function (){
	// console.log(data);
	// this.remote = new Player({id:1, mapid: 24, avatar: 'fed',game : Hide.game});
	console.log('new')
};

Hide.LevelManager.prototype.updatePlayers = function (updates){
	this.remote.updatePlayer(updates);
};

function moveUpdates (data){
	//returns update players x & y position 
	Hide.remote.updatePlayer(data);
};

function statusUpdate (data) {
	//return players updated status
};
