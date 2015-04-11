Hide.LevelManager = function (game){
	 this.pillars,
	 this.pillar,
	 this.chairs,
	 this.chair,
	 this.background,
	 Hide.fireplace,
	 Hide.curtain_1,
	 Hide.curtain_2,
	 Hide.curtain_3,
	 Hide.knight,
	 Hide.box,
	 Hide.box2,
	 Hide.local,
	 Hide.gametimer = 60.00,
	 Hide.remote = null;
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
		if(Hide.local.status == 2){
			Hide.remote = Hide.remote= new Player({id:Hide.players[i].id, xpos: 1500, gameid: Hide.players[i].gameid, avatar: Hide.players[i].avatar,game: Hide.game,status: Hide.players[i].status}); 
			Hide.remote.create();
			Hide.game.physics.arcade.enable([Hide.remote.player]);
			Hide.socket.emit('new:timer',null);
			Hide.socket.on("start:timer",trigTimer);
		}
		else{
			Hide.remote = Hide.remote= new Player({id:Hide.players[i].id, xpos: 1500,gameid: Hide.players[i].gameid, avatar: Hide.players[i].avatar,game : Hide.game, status: Hide.players[i].status}); 
			Hide.remote.create();
			Hide.game.physics.arcade.enable([Hide.remote.player]);
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

	Hide.countDownText = Hide.game.add.bitmapText(Hide.game.world.centerX,Hide.game.world.centerY,'carrier',Hide.gametimer,12);
	Hide.countDownText.fixedToCamera = true;
	
	Hide.socket.on("update:items",function (data){
		return updateItem(data);
	});
};

Hide.LevelManager.prototype.update = function () {	
	Hide.local.input();
 	Hide.socket.on("update:player",function (data) {
		return moveUpdates(data);
	});
};
Hide.LevelManager.prototype.logic = function (item){
		console.log(item);
		if(Hide.local.status == 1 && !item.player){
			Hide.local.player.alpha = 0;
			item.showTooltip('you are\n\n safe!',5);
			item.player = true;
			Hide.local.status = 3;
			Hide.socket.emit("update:item",{key: item.obj, player:true, status: 3});
		}
		else if(Hide.local.status == 1 && item.player){
			item.showTooltip('find\n\n another spot!',5);
		}
		else if(Hide.local.status == 2){ 
			if(!item.player){
				item.showTooltip('no one\n\n here!',5);
			}
			else{
				Hide.remote.player.alpha = 1;
				item.showTooltip('Got\n\n you!',5);
				Hide.socket.emit("update:item",{key: item.obj, player:false, status: 1});
			}
		}
		else if(Hide.local.status == 3){
			Hide.local.player.alpha = 1;
			item.player = false; 
			item.showTooltip('go hide!',5);
			Hide.local.status = 1;
			Hide.socket.emit("update:item",{key: item.obj, player:false, status: 1});
		}
};
//helper functions called by server 
function trigTimer(){
	Hide.countDownText = Hide.game.time.events.loop(Phaser.Timer.SECOND,updateTimer);
}
function updateTimer(){
	Hide.gametimer -=1.00;
	if(Hide.gametimer == 0.00){
		Hide.game.time.events.remove(Hide.countDownText);
		Hide.game.state.start('lobby');
	}
	else{
		console.log(Hide.gametimer);
		Hide.countText.setText(Hide.gametimer);
	}
};

function moveUpdates (data){
	Hide.remote.updatePlayer(data);
};

function updateItem (data){

	switch(data.key){
		case "level_fireplace":
			if(Hide.local.status == 2){
				Hide.fireplace.player = data.player;
				Hide.remote.status = data.status;
				Hide.remote.updateHidding();
			}
			else{
				Hide.fireplace.player = data.player;
				Hide.local.status = data.status;
				Hide.local.updateHidding();
			}
			break;
		case "level_curtain":
			if(Hide.local.status == 2){
				Hide.curtain_1.player = data.player;
				Hide.remote.status = data.status;
				Hide.remote.updateHidding();
			}
			else{
				Hide.curtain_1.player = data.player;
				Hide.local.status = data.status;
				Hide.local.updateHidding();
			}
			break;
		case "level_knight":
			if(Hide.local.status == 2){
				Hide.knight.player = data.player;
				Hide.remote.status = data.status;
				Hide.remote.updateHidding();
			}
			else{
				Hide.knight.player = data.player;
				Hide.local.status = data.status;
				Hide.local.updateHidding();
			}
			break;
		case "level_bookshelf_1":
			if(Hide.local.status == 2){
				Hide.bookshelf1.player = data.player;
				Hide.remote.status = data.status;
				Hide.remote.updateHidding();
			}
			else{
				Hide.bookshelf1.player = data.player;
				Hide.local.status = data.status;
				Hide.local.updateHidding();
			}
			break;
		case "level_bookshelf_2":
			if(Hide.local.status == 2){
				Hide.bookshelf2.player = data.player;
				Hide.remote.status = data.status;
				Hide.remote.updateHidding();
			}
			else{
				Hide.bookshelf2.player = data.player;
				Hide.local.status = data.status;
				Hide.local.updateHidding();
			}
			break;
		case "level_box":
			if(Hide.local.status == 2){
				Hide.box.player = data.player;
				Hide.remote.status = data.status;
				Hide.remote.updateHidding();
			}
			else{
				Hide.box.player = data.player;
				Hide.local.status = data.status;
				Hide.local.updateHidding();
				Hide.local.updateHidding();
			}
			break;
		case "level_box2":
			if(Hide.local.status == 2){
				Hide.box2.player = data.player;
				Hide.remote.status = data.status;
				Hide.remote.updateHidding();
			}
			else{
				Hide.box2.player = data.player;
				Hide.local.status = data.status;
				Hide.local.updateHidding();
			}
			break;
	}
};