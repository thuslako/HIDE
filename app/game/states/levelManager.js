Hide.LevelManager = function (game){
	 Hide.game = game; 
	 this.player,
	 this.pillars,
	 this.pillar,
	 this.chairs,
	 this.chair,
	 Hide.fireplace,
	 Hide.curtain_1,
	 Hide.curtain_2,
	 Hide.curtain_3,
	 Hide.level_knight,
	 Hide.level_box,
	 Hide.level_box2,
	 Hide.local,
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

	Hide.fireplace = new Item({obj: 'level_fireplace',game: Hide.game, x: 352	, y: 345, });
	Hide.fireplace.create();
	Hide.fireplace.item.inputEnabled = true;
	Hide.fireplace.item.events.onInputDown.add(function(){ this.logic(Hide.fireplace); }, this);

	this.chairs = Hide.game.add.group();
	this.chairs.enableBody = true;

	this.chair = this.chairs.create(180,315,'level_chair1');
	this.chair.scale.setTo(0.5,0.5);
	
	this.chair = this.chairs.create(450,315,'level_chair_2');
	this.chair.scale.setTo(0.5,0.5);

	this.ground = Hide.game.add.sprite(0,385,'level_ground');
	this.ground.scale.setTo(0.6, 0.6);
	this.ground.immovable = true;

	Hide.curtain_1 = new Item({obj: 'level_curtain',game: Hide.game, x: 785, y: 272});
	Hide.curtain_1.create();
	Hide.curtain_1.item.inputEnabled = true;
	Hide.curtain_1.item.events.onInputDown.add(function(){ this.logic(Hide.curtain_1); }, this);

	Hide.curtain_2 = new Item({obj: 'level_curtain',game: Hide.game, x: 980, y: 272});
	Hide.curtain_2.create();
	Hide.curtain_2.item.inputEnabled = true;
	Hide.curtain_2.item.events.onInputDown.add(function(){ this.logic(Hide.curtain_2); }, this);

	Hide.curtain_3 = new Item({obj: 'level_curtain',game: Hide.game, x: 1180, y: 272});
	Hide.curtain_3.create();
	Hide.curtain_3.item.inputEnabled = true;
	Hide.curtain_3.item.events.onInputDown.add(function(){ this.logic(Hide.curtain_3); }, this);


	Hide.bookshelf1 = new Item({obj: 'level_bookshelf_1',game: Hide.game, x: 1580, y: 300});
	Hide.bookshelf1.create();
	Hide.bookshelf1.item.inputEnabled = true;
	Hide.bookshelf1.item.events.onInputDown.add(function(){ this.logic(Hide.bookshelf1); }, this);

	Hide.knight = new Item({obj: 'level_knight',game: Hide.game, x: 1730, y: 305});
	Hide.knight.create();
	Hide.knight.item.inputEnabled = true;
	Hide.knight.item.events.onInputDown.add(function(){ this.logic(Hide.knight); }, this);

	Hide.bookshelf2 = new Item({obj: 'level_bookshelf_2',game: Hide.game, x: 1880, y: 300});
	Hide.bookshelf2.create();
	Hide.bookshelf2.item.inputEnabled = true;
	Hide.bookshelf2.item.events.onInputDown.add(function(){ this.logic(Hide.bookshelf2); }, this);

	// this.piano = new Item({obj: 'level_piano',game: Hide.game, x: 2380, y: 360});
	// this.piano.create();
	Hide.local = new Player({id:Hide.player.id, gameid: Hide.player.gameid, avatar: Hide.player.avatar,game : Hide.game, status: Hide.player.status});
	Hide.local.create();
	Hide.game.physics.arcade.enable([Hide.local.player]);
	Hide.game.camera.follow(Hide.local.player);
	

	Hide.box = new Item({obj: 'level_box',game: Hide.game, x: 2220, y: 360, });
	Hide.box.create();
	Hide.box.item.inputEnabled = true;
	Hide.box.item.events.onInputDown.add(function(){ this.logic(Hide.box); }, this);

	Hide.box2 = new Item({obj: 'level_box',game: Hide.game, x: 2450, y: 360, });
	Hide.box2.create();
	Hide.box2.item.inputEnabled = true;
	Hide.box2.item.events.onInputDown.add(function(){ this.logic(Hide.box2); }, this);

	for(var i=1;i < Hide.players.length; i++){
		if(Hide.player.status == 2){
			this.remote = Hide.remote= new Player({id:Hide.players[i].id, xpos: 1500, gameid: Hide.players[i].gameid, avatar: Hide.players[i].avatar,game: Hide.game,status: Hide.player.status}); 
			this.remote.create();
			Hide.socket.on('new:player',this.newPlayer);
		}
		else{
			this.remote = Hide.remote= new Player({id:Hide.players[i].id, gameid: Hide.players[i].gameid, avatar: Hide.players[i].avatar,game : Hide.game, status: Hide.player.status}); 
			this.remote.create();
			Hide.socket.on('new:player',this.newPlayer);
		}
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
	Hide.local.input();
 	Hide.socket.on("update:player",function (data) {
		return moveUpdates(data);
	});
	Hide.socket.on("update:items",function (data){
		return updateItem(data);
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

function updateItem (data){

	switch(data.key){
		case "level_fireplace":
			Hide.fireplace.player = data.player;
			Hide.remote.status = data.status;
			Hide.remote.updateHidding();
			console.log(Hide.remote.status);
			break;
		case "level_curtain_1":
			Hide.curtain_1.player = data.player;
			Hide.remote.status = data.status;
			Hide.remote.updateHidding();
			console.log(Hide.remote.status);
			break;
		case "level_curtain_2":
			Hide.level_curtain_2.player = data.player;
			Hide.remote.status = data.status;
			Hide.remote.updateHidding();
			console.log(Hide.remote.status);
			break;
		case "level_knight":
			Hide.knight.player = data.player;
			Hide.remote.status = data.status;
			Hide.remote.updateHidding();
			console.log(Hide.remote.status);
			break;
		case "level_this.bookshelf1":
			Hide.level_bookshelf_1.player = data.player;
			Hide.remote.status = data.status;
			Hide.remote.updateHidding();
			console.log(Hide.remote.status);
			break;
		case "level_this.bookshelf2":
			Hide.level_bookshelf_2.player = data.player;
			Hide.remote.status = data.status;
			Hide.remote.updateHidding();
			console.log(Hide.remote.status);
			break;
		case "level_box":
			Hide.level_box.player = data.player;
			Hide.remote.status = data.status;
			Hide.remote.updateHidding();
			console.log(Hide.remote.status);
			break;
		case "level_box2":
			Hide.level_box2.player = data.player;
			Hide.remote.status = data.status;
			Hide.remote.updateHidding();
			console.log(Hide.remote.status);
			break;
	}
};


Hide.LevelManager.prototype.logic = function (obj){
		console.log(obj.obj);
		if(Hide.local.status == 1){
			console.log('called 1');
			obj.showTooltip('you are\n\n safe!',5);
			obj.player = Hide.local.id;
			Hide.local.player.alpha = 0;
			Hide.local.status = 3;
			Hide.socket.emit("update:item",{key: obj.obj, player: Hide.local.id, status: 3});
		}
		else if(Hide.local.status == 2){ 
			console.log('clicked 2');
			if(!obj.player && Hide.local.status == 2){
				obj.showTooltip('no one\n\n here!',5);
			}
			else{
				obj.showTooltip('Bingo!',5);
			}
		}
		else if(Hide.local.status == 3){
			Hide.local.player.alpha = 1;
			obj.player = null; 
			obj.showTooltip('bye!',5);
			Hide.local.status = 1;
			Hide.socket.emit("update:item",{key: obj, player: null, status: 1});
		}
};

