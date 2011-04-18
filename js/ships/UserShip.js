var UserShip = (function() {
	var turnSpeed = .05,
		banking = turnSpeed * 2.6,
		rayDirection = new THREE.Vector3(0,-1,0),
		rayOffsetY = 1000,
		rFrontLeft = Math.PI / 6,
		rFrontRight = (Math.PI * 11) / 6,
		rLeft = Math.PI / 2,
		rRight = (Math.PI * 3) / 2
	;
	
	function UserShip(scene, keyHandler) {
		keyHandler.add(38, this, this.accelerate);
		keyHandler.add(37, this, this.turnLeft);
		keyHandler.add(39, this, this.turnRight);
		keyHandler.add(40, this, this.deccelerate);
		
		this.targetY = 0;
		
		UserShip.parent.constructor.call(this, scene);
	}
	
	Husky.extend(UserShip, Ship);
	
	UserShip.prototype.update = function() {
		if(this.obj == null) {
			return;
		}
		
		this.timer += 1;
		
		
		// Set up rays
		var sampleOffsetFront = this.momentum * 6;
		var sampleOffsetFrontSides = this.momentum * 3;
		
		var rayOffsets = [
			new THREE.Vector3( Math.sin(this.angle) * sampleOffsetFront, 				rayOffsetY, Math.cos(this.angle) * sampleOffsetFront),
			new THREE.Vector3( Math.sin(this.angle + rFrontLeft) * sampleOffsetFrontSides, 	rayOffsetY, Math.cos(this.angle + rFrontLeft) * sampleOffsetFrontSides),
			new THREE.Vector3( Math.sin(this.angle + rFrontRight) * sampleOffsetFrontSides, 	rayOffsetY, Math.cos(this.angle + rFrontRight) * sampleOffsetFrontSides)
		];
		
		var nDistances = 0;
		var totalDistance = 0;
		
		// Calculate hover distances
		for(var i = 0, len = rayOffsets.length; i < len; i++) {
			var rayPosition = this.obj.position.clone().addSelf(rayOffsets[i]);
			var ray = new THREE.Ray(rayPosition, rayDirection);
			var cast = THREE.Collisions.rayCastNearest(ray);
			
			if(cast && cast.distance >= 0) {
				totalDistance += cast.distance;
				nDistances++;
			}
		}
		
		// Calculate average distance from ground and apply to targetY
		if(nDistances > 0) {
			var avgDistance = totalDistance / nDistances;
			
			var yDiff = avgDistance - 150 - rayOffsetY;
			
			this.targetY -= Math.min(yDiff, 40) * .2;
		}
		
		this.obj.position.y += (this.targetY - this.obj.position.y) * .06;
		
		// Deaccelerate
		this.momentum *= .99;
		
		// Banking
		this.obj.rotation.z *= .92;
		
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
		this.momentum = Math.min(this.momentum + .6, 12);
	}
	
	UserShip.prototype.deccelerate = function() {
		this.momentum = Math.max(this.momentum - .3, -5);
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