var Item = function(build){
	this.obj = build.obj;
	this.x = build.x;
	this.y = build.y;
	Hide.game = build.game;
	this.iteam,
	this.player,
	this.msgtooltip,
	this.newTool,
	this.closeTool,
	this.msgtext = null; 

};


Item.prototype.create = function () {

	Hide.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.item = Hide.game.add.sprite(this.x,this.y,this.obj);
	this.item.anchor.setTo(0.5);
	this.item.scale.setTo(0.5,0.5);


	this.msgtooltip = Hide.game.add.sprite(this.x,this.y-80,'tooltip');
	this.msgtooltip.anchor.setTo(0.5,0.5);
	this.msgtooltip.scale.setTo(1.3,1.3);
	this.msgtooltip.alpha = 0; 

	this.newTool = this.msgtooltip.animations.add('msg-tool-open',[1,2]);
	this.closeTool = this.msgtooltip.animations.add('msg-tool-close',[2,1]);

	this.msgtext= Hide.game.add.bitmapText(this.x-25,this.y-90,'carrier',this.message,5);
	this.msgtext.alpha = 0; 
	this.msgtext.align = 'center';

	this.showTooltip('Hiding\n\n spot!',30);
};

Item.prototype.showTooltip = function (msg,delay) {
	this.msgtext.setText(msg); 
	this.msgtooltip.alpha = 1; 
	this.msgtooltip.animations.play('msg-tool-open');

	this.newTool.onComplete.add(function(){
		this.msgtext.alpha =1;
	},this);

	Hide.game.time.events.add(Phaser.Timer.SECOND * delay, function(){
		this.msgtext.alpha = 0;
		this.msgtooltip.animations.play('msg-tool-close');
		this.msgtooltip.alpha = 0; 

	},this);
};

