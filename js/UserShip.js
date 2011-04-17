var UserShip = (function() {
	var turnSpeed = .04,
		banking = turnSpeed * 1.4
	;
	
	function UserShip(scene, keyHandler) {
		keyHandler.add(38, this, this.accelerate);
		keyHandler.add(37, this, this.turnLeft);
		keyHandler.add(39, this, this.turnRight);
		keyHandler.add(40, this, this.deccelerate);
		
		UserShip.parent.constructor.call(this, scene);
	}
	
	Husky.extend(UserShip, Ship);
	
	UserShip.prototype.update = function() {
		this.uniforms2.time.value += .1;
		
		if(this.obj == null) {
			return;
		}
		
		this.timer += 1;
		
		this.obj.rotation.z *= .94;
		
		this.obj.position.y = Math.cos(this.timer * .03) * 5;
		this.momentum *= .99;
		this.angle += (this.rotation - this.angle) * .05;
		this.obj.position.x += Math.sin(this.angle) * this.momentum;
		this.obj.position.z += Math.cos(this.angle) * this.momentum;
	}
	
	UserShip.prototype.turnRight = function() {
		this.rotation -= turnSpeed;
		this.obj.rotation.z += banking;
		this.updateRotation();
	}
	
	UserShip.prototype.turnLeft = function() {
		this.rotation += turnSpeed;
		this.obj.rotation.z -= banking;
		this.updateRotation();
	}
	
	UserShip.prototype.accelerate = function() {
		this.momentum = Math.min(this.momentum + .4, 10);
	}
	
	UserShip.prototype.deccelerate = function() {
		this.momentum = Math.max(this.momentum - .2, -5);
	}
	
	UserShip.prototype.sendUpdate = function(socketHandler) {
		if(this.timer % 5 == 0) {
			if(this.obj) {
				socketHandler.send('update', {
					p: this.obj.position,
					r: this.obj.rotation
				});
			}
		}
	}
	
	return UserShip;
})();