var Tooltip = function (build) {
	this.x = build.x || 0; 
	this.y = build.y || 0; 
	Hide.game = build.game; 
	this.message = build.message || 'Hide here!';
	this.textSize = build.textSize; 
	this.msgtooltip = null;
	this.msgtext = null; 

};

Tooltip.prototype.build = function () {

	this.msgtooltip = Hide.game.add.sprite(this.x,this.y-80,'tooltip');
	this.msgtooltip.anchor.setTo(0.5,0.5);
	this.msgtooltip.scale.setTo(1.3,1.3);
	this.msgtooltip.alpha = 0; 

	this.newTool = this.msgtooltip.animations.add('msg-tool-open',[0,1,2]);
	this.closeTool = this.msgtooltip.animations.add('msg-tool-close',[2,1,0]);

	this.msgtext= Hide.game.add.bitmapText(this.x-28,this.y-90,'carrier',this.message,5);
	this.msgtext.alpha = 0; 
	this.msgtext.align = 'center';

};
Tooltip.prototype.openToolTip = function () {
	this.msgtooltip.alpha = 1; 
	this.msgtooltip.animations.play('msg-tool-open');

	this.newTool.onComplete.add(function(){
		this.msgtext.alpha =1;
	},this);

	Hide.game.time.events.add(Phaser.Timer.SECOND * 3, function(){
		this.msgtooltip.animations.play('msg-tool-close');
		this.msgtooltip.alpha = 0; 
		this.msgtext.alpha = 0;
	},this);

};

Tooltip.prototype.updateToolTip = function (msg) {
	this.msgtooltip.animations.play('msg-tool-open');
	this.msgtext.setText(msg); 
};
Tooltip.prototype.closeToolTip = function () {
		this.msgtooltip.animations.play('msg-tool-close');
		
		this.closeTool.onComplete.add(function(){
			this.msgtooltip.alpha =1;
		},this);

		this.msgtext.alpha = 0;
};