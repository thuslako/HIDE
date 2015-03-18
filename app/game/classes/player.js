//player

Hide.Player = function(id,x,y,avatar,game) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.sel = avatar;
		this.itplayer = false;
		this.trys = 3; 
		this.score = 0; 
		this.hidden = false; 
		this.lastUpdate =  0;
		this.avatar = null;
		this.speech = null;
		this.cursors = null;
		this.mouse = null;
		this.tween = null;
		this.socket = io(); 
		this.game = game;
	 
	}
	Hide.Player.prototype = {
		create: function(){
			this.avatar = this.game.add.sprite(this.x,this.y,this.sel);
			this.game.physics.arcade.enable([this.avatar]);

			this.avatar.anchor.setTo(0.5, 0.5);
	    	this.avatar.body.bounce.y = 0.2;
	    	this.avatar.body.gravity.y = 600;
	    	this.avatar.body.collideWorldBounds = true;

			this.avatar.animations.add('left', [0], 3, true);
		    this.avatar.animations.add('right', [2], 3, true);

		    this.cursors = this.game.input.keyboard.createCursorKeys();
		    this.mouse = this.game.input.mouse.button = 0;
		    this.tween = this.game.add.tween(this.avatar);
		    this.tween.to({angle:'+5'},100);
		    this.tween.to({angle:'-6'},100);
		    this.tween.to({angle:'+7'},100);
		    this.tween.to({angle:'-6'},80);
		},
		input: function ()  {
			//check if player is hidden if not player can move otherwise player can't move 
			if(!this.hidden){
				// if(this.game.input.mouse.button == 0 ){
			 //    	console.log('clicked left');
				// }
				this.avatar.body.velocity.x = 0;
				
			    if (this.cursors.left.isDown)
			    {
			        //  Move to the left
			        this.avatar.body.velocity.x = -150;
			        this.avatar.animations.play('left');
			        this.tween.start();
			    }
				else if (this.cursors.up.isDown || this.avatar.body.touching.down)
	    		{
	        		this.avatar.body.velocity.y = -350;
	    		}
			    else if (this.cursors.right.isDown)
			    {
			        //  Move to the right
			       this.avatar.body.velocity.x = 150;
			       this.avatar.animations.play('right');
			       this.tween.start();
			    }
			    else
			    {
			        //  Stand still
			        this.avatar.animations.stop();
			        this.avatar.frame = 1;
			    }
				
				

			}		
		},
		kill: function () {
			this.avatar.kill();
		}


};
