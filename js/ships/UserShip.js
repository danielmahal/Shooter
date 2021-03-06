var UserShip = (function() {
	var turnSpeed = .04,
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
	
	UserShip.prototype.modelLoaded = function(geometry) {
		UserShip.parent.modelLoaded.call(this, geometry);
		
		var material = new THREE.MeshPhongMaterial( { color: 0x000000, wireframe: true }  );
		var geometry = new THREE.Cube(40, 20, 30);
		this.hitbox = new THREE.Mesh(geometry, material);
		this.hitbox.position.z = -10;
		
		this.obj.addChild(this.hitbox);
	}
	
	UserShip.prototype.update = function() {
		if(this.obj == null) {
			return;
		}
		
		this.timer += 1;
		
		// Deaccelerate
		this.momentum *= .99;
		
		// Banking
		this.obj.rotation.z *= .92;
		
		this.angle += (this.rotation - this.angle) * .05;
		
		this.obj.position.x += Math.sin(this.angle) * this.momentum;
		this.obj.position.z += Math.cos(this.angle) * this.momentum;
		this.obj.position.y = 100 + Math.sin(this.timer*.05) * 5;
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
		if(this.timer % 1 == 0) {
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