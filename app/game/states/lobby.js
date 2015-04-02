Hide.Lobby = function (game) {
	this.game = Hide.game = game;
	this.i = -120;
	this.switch = ['#3DB8A9','#FBF7F4','#CC9466','#8257C7','#2E8A43'];
	this.tween = null;
	this.gray = null;
	this.confetti = null;
	this.selected = false;
};
Hide.Lobby.prototype.init = function () {
	Hide.socket.on("list:game",this.gameList);
};
Hide.Lobby.prototype.preload = function () {
		this.selectGroup = this.add.group();
		this.selectedGroup = this.add.group();
			this.select('fed');
			this.select('joe');
			this.select('kim');
			this.select('hit');
			this.select('bin');	
};
Hide.Lobby.prototype.create = function () {
  	Hide.socket.on("connected", function (data){
          Hide.player.id = data.id;
          console.log(data);
    });
  	this.game.physics.startSystem(Phaser.Physics.ARCADE);
  	this.confetti = Hide.game.add.emitter(0, 0, 100);
  	this.confetti.makeParticles('confetti');
  	this.confetti.gravity = 200;

  	this.game.stage.backgroundColor = '#FBF7F4';
  	this.style = { font: '65px Arial', fill: '#DFE0E5', align: 'center'};
  
  	this.titleText = Hide.game.add.text(Hide.game.world.centerX, 50, 'HIDE', this.style);
  	this.titleText.anchor.setTo(0.5, 0.5);
  	this.titleText.alpha = 0;

  	this.gameInput = Hide.game.add.text(Hide.game.world.centerX, 100, 'Select one of the character below ', { font: '16px Arial', fill: '#0000', align: 'center'});
  	this.gameInput.anchor.setTo(0.5, 0.5);
  	this.tween = Hide.game.add.tween(this.titleText);
  	this.tween.to( { alpha: 1 }, 1000, "Linear", true);
};

Hide.Lobby.prototype.update = function () {
};

Hide.Lobby.prototype.characterSelec = function (sprite, pointer) {
		if(!this.selected){
			this.selectedGroup.add(sprite);
			this.selectGroup.remove(sprite);

			var gray = this.game.add.filter('Gray');
			this.selectGroup.filters = [gray];
			this.selectGroup.forEach(function(character) {
				character.inputEnabled = false;
			});

			Hide.player.avatar = sprite.key;
			Hide.game.state.start('game');
			return this.selected = true;
		}
		else{
			this.selectGroup.add(sprite);
			this.selectedGroup.remove(sprite);
			this.selectGroup.filters = [];
			this.selectGroup.forEach(function(character) {
				character.inputEnabled = true;
			});
			return this.selected = false;
		}
};
Hide.Lobby.prototype.select = function(avatar){
		this.character = this.game.add.sprite( this.game.world.centerX+(this.i), 200, avatar);
		this.character.anchor.setTo(0.5, 0.5);
		this.character.inputEnabled = true;	
		this.character.events.onInputDown.add(this.characterSelec, this);
		this.character.events.onInputDown.add(this.confettiBurst, this);
		
		this.selectGroup.add(this.character);	
								this.i= this.i+60;		
};

Hide.Lobby.prototype.gameList = function (a) { 
  if(a.length > 0 ){
 		var j = 250;
      	for(var k=0; k < a.length; k++){
      		console.log('returned list: '+ a.list[k]);
  	  	 	this.countText = Hide.game.add.text(Hide.game.world.centerX, j, 'Game: '+a.list[k],  { font: '12px Arial', fill: '#71BF40', align: 'center'});
			this.countText.anchor.setTo(0.5, 0.5);
			j= j+20;
      	}

      Hide.socket.emit("new:player",Hide.player);
      return;
  }
  else if (a.length == 0){
  		 this.newGameText = Hide.game.add.text(Hide.game.world.centerX, 350,'start new game!',  { font: '12px Arial', fill: '#71BF40', align: 'center'});
	  	 this.newGameText.anchor.setTo(0.5, 0.5);
	  	 this.newGameText.inputEnabled = true;
  }
};

Hide.Lobby.prototype.startgame = function (){
		this.state.start('game');
};

Hide.Lobby.prototype.confettiBurst = function(tra) {
		this.confetti.x = tra.x;
		this.confetti.y = tra.y;
		this.confetti.start(true, 2000, null, 30);
};

Hide.Lobby.prototype.updateId = function (data) {
	console.log('top2');
	Hide.player.id = data.id; 
	console.log("called "+data);
};

function connected (data){
	Hide.player.id = data.id;
	console.log(Hide.player);
};
