var MarsRover = MarsRover || {};

MarsRover.Mars = function(dimension){
	this.dimension = dimension || [100, 100];
	this.obstacles = {};
};

MarsRover.Mars.prototype = {
	setObstacle : function(position){
		position = this.wrapping(position);
		if(this.checkCollision(position)){ throw {msg : "Collision detected at "+position}; }
		else { this.obstacles[JSON.stringify(position)] = true; }
	},
	removeObstacle : function(position){
		position = this.wrapping(position);
		if(this.checkCollision(position)){ 
			delete this.obstacles[JSON.stringify(position)];
		}
	},
	checkCollision : function(position){
		return this.obstacles.hasOwnProperty(JSON.stringify(position));
	},
	nextEmptyPosition : function(){
		for(var i=0; i<this.dimension[0]-1; ++i){
			for(var j=0; j<this.dimension[1]-1; ++j){
				if(!this.checkCollision([i, j])){ return [i, j]; }
			}
		}
	},
	wrapping : function(position){
		var wrappedPosition =
			[(position[0]+this.dimension[0])%this.dimension[0],
			 (position[1]+this.dimension[1])%this.dimension[1]];	
		return wrappedPosition;
	}
};



MarsRover.Rover = function(mars, position, facing){

	if(mars !== undefined){	this.mars = mars; }
	else { return false; }

	if(position && !this.mars.checkCollision(position)){ this.position = position; }
	else { 
		this.position = this.mars.nextEmptyPosition();
		if(this.position === undefined){ throw { msg : "No space on mars is allowed for allocation"} }
	}

	switch(facing){
		case "N" : this.facing = [0, 1]; break;
		case "S" : this.facing = [0, -1]; break;
		case "E" : this.facing = [1, 0]; break;
		case "W" : this.facing = [-1, 0]; break;
		default : this.facing = [0, 1]; break;
	}
};

MarsRover.Rover.prototype = {
	execute : function(commands){

		for(var i=0; i<commands.length; ++i){
			if(commands[i] === 'f' || commands[i] === 'b'){
				try { this.move(commands[i]); }
				catch(exception) { return exception.msg; }
			}
			else if(commands[i] === 'l' || commands[i] === 'r'){ this.turn(commands[i]); }
		}
		return this.getPosition();
	},
	move : function(command){
		var	
			isForward = (command === 'f')? 1:-1; 
			direction = this.facing.map(function(i){ return i*isForward; });
			newPosition = [this.position[0]+direction[0], this.position[1]+direction[1]];

		try { this.mars.setObstacle(newPosition); }
		catch(exception) { 
			throw { msg : exception.msg+", rover stopped at "+this.getPosition() };
			return false;
		}

		this.mars.removeObstacle(this.position);
		this.position = this.mars.wrapping(newPosition);
		return true;
	},
	turn : function(command){
		this.facing = 
			(command === 'l')? [-this.facing[1], this.facing[0]] : [this.facing[1], -this.facing[0]];
	},
	getPosition : function(){
		return this.position;
	}
};
