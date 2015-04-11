//player
	var Player = function(config) {
		this.gameid = config.gameid || -1; 
		this.id = config.id || null;
		this.x = config.xpos||0;
		this.y = 0;
		this.avatar = config.avatar || '';
		this.status = config.status|| 1; 
		this.lastUpdate =  0;
		this.player = null;
		this.cursors = null;
	}
	
	Player.prototype = {
		create: function(){
			Hide.game.physics.startSystem(Phaser.Physics.ARCADE);
			this.player = Hide.game.add.sprite(this.x,this.y,this.avatar);
			Hide.game.physics.arcade.enable([this.player]);
			this.player.anchor.setTo(0.5, 0.5);
		    this.player.body.bounce.y = 0.2;
		    this.player.body.gravity.y = 600;
		    this.player.body.collideWorldBounds = true;

			this.cursors = Hide.game.input.keyboard.createCursorKeys();
			
			this.player.animations.add('left', [0], 3, true);
			this.player.animations.add('right', [2], 3, true);
			
			
		    this.tween = Hide.game.add.tween(this.player);
		    this.tween.to({angle:'+5'},100);
		    this.tween.to({angle:'-6'},80);
		    this.tween.to({angle:'+7'},100);
		    this.tween.to({angle:'-6'},80);

	    	this.wasd = {
		          up: Hide.game.input.keyboard.addKey(Phaser.Keyboard.W),
		          down: Hide.game.input.keyboard.addKey(Phaser.Keyboard.S),
		          left: Hide.game.input.keyboard.addKey(Phaser.Keyboard.A),
		          right: Hide.game.input.keyboard.addKey(Phaser.Keyboard.D)
		    };

		},
		input: function ()  {
			this.player.body.velocity.x = 0; 
			if(this.status != 3){ 
			    if (this.wasd.left.isDown)
			    {
					this.animPlayer('left',true);
					this.player.body.velocity.x = -150;
					return;
			    }
			    else if (this.wasd.right.isDown)
			    {
					this.animPlayer('right',true);
					this.player.body.velocity.x = 150;
					return;
			    }
				else if (this.wasd.up.isDown)
	    		{
					this.animPlayer('up',true);
					this.player.body.velocity.y = -350; 
					return;
	    		}
			    else
			    {
					this.animPlayer('',false); 
					return;
			    }
			    return;				
			}		
		},
		animPlayer: function (dir,toggle){
			if(toggle){	
				this.player.animations.play(dir);
				Hide.socket.emit('update:player',{ posX:this.player.position.x, posY: this.player.position.y,dir: dir});
				this.tween.start();
				return;
			}
			else if(!toggle){
				Hide.socket.emit('update:player',{ posX:this.player.position.x, posY: this.player.position.y,dir: null});
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
				this.player.position.x = data.posX;
				this.player.animations.play(data.dir);
				this.tween.start();
			}
			else if(data.dir == 'up'){
				this.player.body.velocity.y = -350; 
			}
			else{
				this.player.animations.stop();
				this.player.frame = 1;
				return;
			}
		},
		updateHidding: function (){
			if(this.status == 3){
				this.player.alpha = 0; 
			} 
			else{
				this.player.alpha = 1;
			}
		}




};
