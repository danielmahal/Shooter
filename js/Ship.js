var Ship = (function() {
	var turnSpeed = .04,
		banking = turnSpeed * 1.4
	;
	
	function Ship(scene) {
		var that = this;
		
		this.timer = 0;
		this.obj = null;
		this.momentum = 0;
		this.angle = 0;
		this.rotation = 0;
		
		var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x000000, specular: 0xaaaaaa, shininess: 20, shading: THREE.SmoothShading }  );
		loader = new THREE.JSONLoader( true );
		
		loader.load({
			model: "models/ship.js",
			callback: function( geometry ) {
				that.obj = THREE.SceneUtils.addMesh( scene, geometry, 20, 0, 0, 0, 0, 0, 0, material );
				new THREE.ShadowVolume( that.obj );
			}
		});
	}
	
	Ship.prototype.update = function() {
		if(this.obj == null) {
			return;
		}
		
		this.timer++;
		
		this.obj.rotation.z *= .94;
		
		this.obj.position.y = Math.cos(this.timer * .03) * 5;
		this.momentum *= .99;
		this.angle += (this.rotation - this.angle) * .05;
		this.obj.position.x += Math.sin(this.angle) * this.momentum;
		this.obj.position.z += Math.cos(this.angle) * this.momentum;
	}
	
	Ship.prototype.updateRotation = function() {
		this.obj.rotation.y = this.rotation;
	}
	
	Ship.prototype.turnRight = function() {
		this.rotation -= turnSpeed;
		this.obj.rotation.z += banking;
		this.updateRotation();
	}
	
	Ship.prototype.turnLeft = function() {
		this.rotation += turnSpeed;
		this.obj.rotation.z -= banking;
		this.updateRotation();
	}
	
	Ship.prototype.accelerate = function() {
		this.momentum = Math.min(this.momentum + .4, 10);
	}
	
	Ship.prototype.deccelerate = function() {
		this.momentum = Math.max(this.momentum - .2, -5);
	}
	
	return Ship;
})();