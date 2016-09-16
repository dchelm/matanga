
Player = function (id){
	this.id = id;
	this.x = 0;
	this.y = 0;
	this.vx = 0;
	this.vy = 0;
	this.angle = 0;

	this.updateFromClient = function(vx,vy,angle){
		this.vx = vx;
		this.vy = vy;
		this.angle = angle;
	};
	
	this.udpatePosition = function(){
		this.x += vx;
		vx = 0;
		this.y += vy;
		vy = 0;
	};
}

module.exports = Player