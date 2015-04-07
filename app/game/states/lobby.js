Hide.Lobby = function (game) {
	Hide.game = game;
	this.i = -120;
	this.tween = null;
	this.gray = null;
	this.confetti = null;
	this.selected = false;
};
Hide.Lobby.prototype.create = function () {
	this.selectGroup = this.add.group();
	this.selectedGroup = this.add.group();
	this.select('fed');
	this.select('joe');
	this.select('kim');
	this.select('hit');
	this.select('bin');	


  	Hide.game.physics.startSystem(Phaser.Physics.ARCADE);
  	this.confetti = Hide.game.add.emitter(0, 0, 100);
  	this.confetti.makeParticles('confetti');
  	this.confetti.gravity = 200;

  	Hide.game.stage.backgroundColor = '#FBF7F4';
  	this.style = { font: '65px Arial', fill: '#DFE0E5', align: 'center'};
  
  	this.titleText = Hide.game.add.text(Hide.game.world.centerX, 50, 'HIDE', this.style);
  	this.titleText.anchor.setTo(0.5, 0.5);
  	this.titleText.alpha = 0;

  	this.gameInput = Hide.game.add.text(Hide.game.world.centerX, 100, '_ Select one of the character below', { font: '16px Arial', fill: '#0000', align: 'center'});
  	this.gameInput.anchor.setTo(0.5, 0.5);
  	this.tween = Hide.game.add.tween(this.titleText);
  	this.tween.to( { alpha: 1 }, 1000, "Linear", true);

  	this.selectGame = Hide.game.add.text(Hide.game.world.centerX, 205, '_ Available games', { font: '16px Arial', fill: '#0000', align: 'center'});
  	this.selectGame.anchor.setTo(0.5, 0.5);

  	if(Hide.games.length){
			var j = 250;
	  	for(var k=0; k < Hide.games.length; k++){
		  	this.countText = Hide.game.add.text(Hide.game.world.centerX, j, Hide.games[k],  { font: '12px Arial', fill: '#71BF40', align: 'center'});
			this.countText.anchor.setTo(0.5, 0.5);
			this.countText.inputEnabled = true;
			this.countText.events.onInputDown.add(function(txt){
				txt.fill = "#000";
				Hide.player.gameid = txt.text;
				if(!Hide.player.avatar){
					//add a tooltip to show user error
					console.log('select player');
					return;
				}
				Hide.socket.emit("addToQueue:player",Hide.player);
				this.state.start('queue');
			},this);
			j= j+20;
	  	}
      return;
  	}
  	else if (Hide.games.length == 0){
  		 this.newGameText = Hide.game.add.text(Hide.game.world.centerX, 350,'start new game!',  { font: '12px Arial', fill: '#71BF40', align: 'center'});
	  	 this.newGameText.anchor.setTo(0.5, 0.5);
	  	 this.newGameText.inputEnabled = true;
  	}
};

Hide.Lobby.prototype.update = function () {
};

Hide.Lobby.prototype.characterSelec = function (sprite, pointer) {
		if(!this.selected){
			this.selectedGroup.add(sprite);
			this.selectGroup.remove(sprite);

			var gray = Hide.game.add.filter('Gray');
			this.selectGroup.filters = [gray];
			this.selectGroup.forEach(function(character) {
				character.inputEnabled = false;
			});

			Hide.player.avatar = sprite.key;
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
		this.character = Hide.game.add.sprite( Hide.game.world.centerX+(this.i), 145, avatar);
		this.character.anchor.setTo(0.5, 0.5);
		this.character.inputEnabled = true;	
		this.character.events.onInputDown.add(this.characterSelec, this);
		this.character.events.onInputDown.add(this.confettiBurst, this);
		this.selectGroup.add(this.character);	
		this.i= this.i+60;		
};


Hide.Lobby.prototype.startgame = function (){


		this.state.start('game');
};

Hide.Lobby.prototype.confettiBurst = function(tra) {
		this.confetti.x = tra.x;
		this.confetti.y = tra.y;
		this.confetti.start(true, 2000, null, 30);
};

