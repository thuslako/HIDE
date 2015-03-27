 Hide.Lobby = function (game) {
	this.socket = io();
	Hide.game = game;
	this.i = -120;
	this.switch = ['#3DB8A9','#FBF7F4','#CC9466','#8257C7','#2E8A43'];
	this.tween,
	this.gray,
	this.newGameText,
	this.confetti = null;
	this.selected = false;
};

Hide.Lobby.prototype  = {
	init: function () {
		this.socket.emit("new:connection",null);
	},
	preload : function () {
		this.selectGroup = this.add.group();
		this.selectedGroup = this.add.group();
		this.select('fed');
		this.select('joe');
		this.select('kim');
		this.select('hit');
		this.select('bin');	
	},
	create : function () {
	  	this.socket.on("list:game",this.gameList);

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
	},
	update : function () {
		this.socket.on("start:game",this.startgame);
	},
	characterSelec : function (sprite, pointer) {
		if(!this.selected){
			this.selectedGroup.add(sprite);
			this.selectGroup.remove(sprite);

			this.gray = this.game.add.filter('Gray');
			this.selectGroup.filters = [this.gray];
			this.selectGroup.forEach(function(character) {
				character.inputEnabled = false;
			});

			this.selected = true;
			Hide.characterid = {x:50,y:100,avatar: sprite.key};
			this.socket.emit('new:player',{x:50,y:100,avatar: sprite.key});
		}
		else{
			this.selected = false;
			this.selectGroup.add(sprite);
			this.selectedGroup.remove(sprite);
			this.selectGroup.filters = [];
			this.selectGroup.forEach(function(character) {
				character.inputEnabled = true;
			});
		}
	},
	select: function(avatar){
		this.character = this.add.sprite( Hide.game.world.centerX+(this.i), 200, avatar);
			this.character.anchor.setTo(0.5, 0.5);
				this.character.inputEnabled = true;		
					this.character.events.onInputDown.add(this.characterSelec, this);
						this.selectGroup.add(this.character);
    						this.character.events.onInputOver.add(this.confettiBurst, this);
								this.i= this.i+60;		
	},
	confettiBurst: function(tra) {
		this.confetti.x = tra.x;
		this.confetti.y = tra.y;
		this.confetti.start(true, 2000, null, 30);
	},
	gameList: function (a) {

		 if(a.size > 0 ){
		 		var j = 250;
		      	for(var k=0; k < a.size; k++){
		      		// console.log('returned list: '+ a.games[k]);
		  	  	 	this.countText = Hide.game.add.text(Hide.game.world.centerX, j, 'Join: '+a.games[k],  { font: '12px Arial', fill: '#71BF40', align: 'center'});
					this.countText.anchor.setTo(0.5, 0.5);
					j= j+15;
		      	}
	      }
	      else if (a.size == 0){
	      		 if(this.newGameText2){
	      		 	 this.newGameText2.kill();
	      		 	 return;
	      		 }
      		 	this.newGameText = Hide.game.add.text(Hide.game.world.centerX, 290,'start new game!', { font: '12px Arial', fill: '#71BF40', align: 'center'});
  	  		 	this.newGameText.anchor.setTo(0.5, 0.5);
  	  		 	this.newGameText.inputEnabled = true;		
  	  		 	this.newGameText.events.onInputOver.add(this.startgame, this);
	      }
	      else{
	      		 this.newGameText.kill();
	      		 this.newGameText = Hide.game.add.text(Hide.game.world.centerX, 330,'error trying retrieve game',  { font: '12px Arial', fill: '#71BF40', align: 'center'});
	  	  		 this.newGameText.anchor.setTo(0.5, 0.5);
	      }
	  },
	  startgame: function (){
		this.state.start('game');
	}

};