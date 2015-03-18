Hide.Lobby = function (game) {
	this.socket = io();
	Hide.game = game;
	this.i = -120;
	this.selected = false;
};

Hide.Lobby.prototype  = {
	init: function () {
		this.socket.emit("new:connection",null);
		this.socket.on("list:game",this.gameList);
	},
	preload : function () {
		Hide.game.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js');
		this.selectGroup = this.add.group();
		this.selectedGroup = this.add.group();
			this.select('fed');
				this.select('joe');
					this.select('kim');
						this.select('hit');
							this.select('bin');	
	},
	create : function () {

	  this.style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
      this.titleText = Hide.game.add.text(Hide.game.world.centerX, 50, 'HIDE!', this.style);
      	this.titleText.anchor.setTo(0.5, 0.5);

      Hide.gameInput = Hide.game.add.text(Hide.game.world.centerX, 150, 'Select one of the character below ', { font: '16px Arial', fill: '#ffffff', align: 'center'});
      	Hide.gameInput.anchor.setTo(0.5, 0.5);
	},
	update : function () {
		this.socket.on("start:game",this.startgame);
	},
	characterSelec : function (sprite, pointer) {
		if(!this.selected){
			this.selectedGroup.add(sprite);
			this.selectGroup.remove(sprite);

			var gray = Hide.game.add.filter('Gray');
			this.selectGroup.filters = [gray];
			this.selectGroup.forEach(function(character) {
				character.inputEnabled = false;
			});

			Hide.characterid = {x:50,y:100,avatar: sprite.key};
			this.socket.emit('new:player',{x:50,y:100,avatar: sprite.key});
			this.state.start('game');
			this.selected = true;
		}
		else{
			this.selected = false;
			this.selectGroup.add(sprite);
			this.selectedGroup.remove(sprite);
			this.selectGroup.filters = [null];
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
							this.i= this.i+60;		
	},
	startgame: function (){
		this.state.start('game');
	},
	gameList: function (a) { 
		 if(a.size > 0 ){
		 		var j = 250;
		      	for(var k=0; k < a.size; k++){
		      		console.log('returned list: '+ a.games[k]);
		  	  	 	this.countText = Hide.game.add.text(Hide.game.world.centerX, j, 'Game: '+a.games[k],  { font: '12px Arial', fill: '#71BF40', align: 'center'});
					this.countText.anchor.setTo(0.5, 0.5);
					j= j+20;
		      	}
	      }
	      else if (a.size == 0){
	      		 console.log('working fine');
	      		 this.newGameText = Hide.game.add.text(Hide.game.world.centerX, 350,'start new game!',  { font: '12px Arial', fill: '#71BF40', align: 'center'});
	  	  		 this.newGameText.anchor.setTo(0.5, 0.5);
	  	  		 this.newGameText.inputEnabled = true;
	      }
	      else{
	      		 this.newGameText = Hide.game.add.text(Hide.game.world.centerX, 350,'error trying retrieve game',  { font: '12px Arial', fill: '#71BF40', align: 'center'});
	  	  		 this.newGameText.anchor.setTo(0.5, 0.5);
	  	  		 this.newGameText.inputEnabled = true;
	      }
	  }

};