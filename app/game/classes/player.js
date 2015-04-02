//player
	var Player = function(config) {
		this.gameid = config.gameid || -1; 
		this.id = config.id || '';
		this.x = 0;
		this.y = 0;
		this.avatar = config.avatar || '';
		console.log(config.avatar);
		this.score = 0; 
		this.hidden = false; 
		this.lastUpdate =  0;
		this.player = null;
		this.cursors = null;
		this.tween = null; 
		this.socket = io(); 
		this.game =config.game;
	 
	}
	
	Player.prototype = {
		create: function(){
			this.player = this.game.add.sprite(this.x,this.y,this.avatar);
			this.game.physics.arcade.enable([this.player]);
			this.player.anchor.setTo(0.5, 0.5);
		    this.player.body.bounce.y = 0.2;
		    this.player.body.gravity.y = 600;
		    this.player.body.collideWorldBounds = true;

			this.cursors = this.game.input.keyboard.createCursorKeys();
			
			this.player.animations.add('left', [0], 3, true);
			this.player.animations.add('right', [2], 3, true);
			
			
		    this.tween = this.game.add.tween(this.player);
		    this.tween.to({angle:'+5'},100);
		    this.tween.to({angle:'-6'},80);
		    this.tween.to({angle:'+7'},100);
		    this.tween.to({angle:'-6'},80);

		},
		input: function ()  {
			if(!this.hidden){
				this.player.body.velocity.x = 0; 
			    if (this.cursors.left.isDown)
			    {
					this.animPlayer('left',true);
					this.player.body.velocity.x = -150;
			    }
			    else if (this.cursors.right.isDown)
			    {
					this.animPlayer('right',true);
					this.player.body.velocity.x = 150;
			    }
				else if (this.cursors.up.isDown)
	    		{
					this.animPlayer('up',true);
					this.player.body.velocity.y = -350; 
	    		}
			    else
			    {
					this.animPlayer('',false); 
			    }				
			}		
		},
		animPlayer: function (dir,toggle){
			if(toggle){	
				this.player.animations.play(dir);
				this.socket.emit('update:player',{ posX:this.player.position.x, posY: this.player.position.y,dir: dir});
				this.tween.start();
				return;
			}
			else{
				this.socket.emit('update:player',{ posX:this.player.position.x, posY: this.player.position.y,dir: ''});
				this.player.animations.stop();
				this.player.frame = 1;
				return;
			}
		},
		killPlayer: function () {
			this.player.kill();
		},
		updatePlayer: function (data){
			
			this.player.body.velocity.y = 0; 

			if(data.dir == 'right' || data.dir == 'left'){
				this.tween.start();
				this.player.position.x = data.posX;
				this.player.animations.play(data.dir);
			}
			else if(data.dir == 'up'){
				this.player.body.velocity.y = -350; 
			}
			else{
				this.player.animations.stop();
				this.player.frame = 1;
			}

	
		}




};
