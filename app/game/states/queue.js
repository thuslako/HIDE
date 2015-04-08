Hide.Queue = function (game){
	Hide.players = [];
	Hide.i = 1; 
	Hide.j = 20;
	Hide.timer = 10;
};

Hide.Queue.prototype.create = function (){
	Hide.game.stage.backgroundColor = '#4A4A5B';
	this.titleText = Hide.game.add.bitmapText(Hide.game.world.centerX-100,Hide.game.world.centerY-100,'carrier','Game queue',20);
	Hide.socket.on('current:queue',function(data){ 
		Hide.listPlayers(data);
		if(Hide.i==2){
			if(Hide.player.status == 2){ 
				Hide.timer = 30;
				this.titleText = Hide.game.add.bitmapText(Hide.game.world.centerX-45,Hide.game.world.centerY-65,'carrier','You are it!', 12);
			}
			Hide.game.world.remove(this.ready);
			Hide.countTimer = Hide.game.time.events.loop(Phaser.Timer.SECOND,Hide.updateTimer);
		}
	});
	Hide.socket.on("user:queue",function(data){
		Hide.player = data;
		Hide.players.push(Hide.player);
	});

	this.user = Hide.game.add.text(Hide.game.world.centerX, Hide.game.world.centerY, 'You are playing '+ Hide.player.avatar,  { font: '16px Arial', fill: '#71BF40', align: 'center'});
	this.user.anchor.setTo(0.5, 0.5); 
	Hide.countText = Hide.game.add.bitmapText(Hide.game.world.centerX,Hide.game.world.centerY-40,'carrier',Hide.timer,12);
};
Hide.listPlayers = function (data){
	Hide.players.push(data);
	console.log(data);
	Hide.remotePlayer =  Hide.game.add.text(Hide.game.world.centerX, (Hide.game.world.centerY+Hide.j),' remote player is playing '+ Hide.players[Hide.i].avatar,  { font: '16px Arial', fill: '#27C5FF', align: 'center'});
	Hide.remotePlayer.anchor.setTo(0.5, 0.5); 
	Hide.j =+ 15;
	Hide.i++; 
};

Hide.updateTimer = function(){
	Hide.timer -=1;
	if(Hide.timer == 0){
		Hide.game.time.events.remove(Hide.countTimer);
		Hide.game.state.start('game');
	}
	else if(Hide.players.length < 2){
		Hide.game.time.events.remove(Hide.countTimer);
		//return error telling player has left queue
	}
	else{
		Hide.countText.setText(Hide.timer);
	}
};


