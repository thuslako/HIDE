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
	Hide.game.stage.backgroundColor = '#FBF7F4';


	this.background = Hide.game.add.sprite(0,3,'level_bg');
	this.background.scale.setTo(0.5, 0.5);

	this.fireplace = new Item({obj: 'level_fireplace',game: Hide.game, x: 352	, y: 345, });
	this.fireplace.create();
	this.fireplace.item.inputEnabled = true;
	this.fireplace.item.events.onInputDown.add(function(){ this.fireplace.showTooltip('no one\n\n here!',5);}, this);

	this.chairs = Hide.game.add.group();
	this.chairs.enableBody = true;

	this.chair = this.chairs.create(180,315,'level_chair1');
	this.chair.scale.setTo(0.5,0.5);
	
	this.chair = this.chairs.create(450,315,'level_chair_2');
	this.chair.scale.setTo(0.5,0.5);

	this.ground = Hide.game.add.sprite(0,385,'level_ground');
	Hide.game.physics.arcade.enable([this.ground,Hide.player]);
	this.ground.scale.setTo(0.6, 0.6);
	this.ground.immovable = true;

	this.curtain_1 = new Item({obj: 'level_curtain',game: Hide.game, x: 785, y: 272});
	this.curtain_1.create();
	this.curtain_1.item.inputEnabled = true;

	this.curtain_2 = new Item({obj: 'level_curtain',game: Hide.game, x: 980, y: 272});
	this.curtain_2.create();
	this.curtain_2.item.inputEnabled = true;

	this.curtain_3 = new Item({obj: 'level_curtain',game: Hide.game, x: 1180, y: 272});
	this.curtain_3.create();
	this.curtain_3.item.inputEnabled = true;


	this.bookshelf1 = new Item({obj: 'level_bookshelf_1',game: Hide.game, x: 1580, y: 300});
	this.bookshelf1.create();
	this.bookshelf1.item.inputEnabled = true;

	this.knight = new Item({obj: 'level_knight',game: Hide.game, x: 1730, y: 305});
	this.knight.create();

	this.bookshelf2 = new Item({obj: 'level_bookshelf_2',game: Hide.game, x: 1880, y: 300});
	this.bookshelf2.create();
	this.bookshelf2.item.inputEnabled = true;

	// this.piano = new Item({obj: 'level_piano',game: Hide.game, x: 2380, y: 360});
	// this.piano.create();
	Hide.player = new Player({id:Hide.player.id, gameid: Hide.player.gameid, avatar: Hide.player.avatar,game : Hide.game});
	Hide.player.create();
	Hide.game.physics.arcade.enable([Hide.player.player]);
	Hide.game.camera.follow(Hide.player.player);
	

	this.box = new Item({obj: 'level_box',game: Hide.game, x: 2220, y: 360, });
	this.box.create();
	this.box.item.inputEnabled = true;

	this.box2 = new Item({obj: 'level_box',game: Hide.game, x: 2450, y: 360, });
	this.box2.create();
	this.box2.item.inputEnabled = true;

	for(var i=1;i < Hide.players.length; i++){
		this.remote = Hide.remote= new Player({id:Hide.players[i].id, gameid: Hide.players[i].gameid, avatar: Hide.players[i].avatar,game : Hide.game}); 
		this.remote.create();
		Hide.socket.on('new:player',this.newPlayer); 
	}
	this.pillars = Hide.game.add.group();
	this.pillars.enableBody = true;

	this.pillar = this.pillars.create(650,201,'level_pillar');
	this.pillar.scale.setTo(0.5, 0.52);
	this.pillar.anchor.setTo(0.5, 0.5);

	this.pillar = this.pillars.create(1400,201,'level_pillar');
	this.pillar.scale.setTo(0.5, 0.52);
	this.pillar.anchor.setTo(0.5, 0.5);

	this.pillar = this.pillars.create(2100,201,'level_pillar');
	this.pillar.scale.setTo(0.5, 0.52);
	this.pillar.anchor.setTo(0.5, 0.5);

};

Hide.LevelManager.prototype.update = function () {	
	Hide.player.input();
 	Hide.socket.on("update:player",function (data) {
		return moveUpdates(data);
	});
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
