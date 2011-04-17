var Ship = function(scene) {
	var that = this,
		timer = 0,
		turnSpeed = .04,
		banking = turnSpeed*1.5;
	
	
	this.obj = null;
	this.momentum = 0;
	this.angle = 0;
	this.rotation = 0;
	
	this.update = function() {
		if(this.obj == null) {
			return;
		}
		
		timer++;
		
		this.obj.rotation.z *= .9;
		
		this.obj.position.y = Math.cos(timer * .03) * 5;
		this.momentum *= .99;
		this.angle += (this.rotation - this.angle) * .05;
		this.obj.position.x += Math.sin(that.angle) * that.momentum;
		this.obj.position.z += Math.cos(that.angle) * that.momentum;
	};
	
	var updateRotation = function() {
		that.obj.rotation.y = that.rotation;
	}
	
	this.turnRight = function() {
		that.rotation -= turnSpeed;
		that.obj.rotation.z += banking;
		
		updateRotation();
	};
	
	this.turnLeft = function() {
		that.rotation += turnSpeed;
		that.obj.rotation.z -= banking;
		updateRotation();
	};
	
	this.accelerate = function() {
		that.momentum = Math.min(that.momentum + .4, 10);
	};
	
	this.boost = function() {
		that.momentum = 20;
	};
	
	this.deaccelerate = function() {
		that.momentum = Math.max(that.momentum - .2, -5);
	};
	
	(function() {
		var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x000000, specular: 0xaaaaaa, shininess: 20, shading: THREE.SmoothShading }  );
		loader = new THREE.JSONLoader( true );
		
		loader.load({
			model: "models/ship.js",
			callback: function( geometry ) {
				that.obj = THREE.SceneUtils.addMesh( scene, geometry, 20, 0, 0, 0, 0, 0, 0, material );
				new THREE.ShadowVolume( that.obj );
			}
		});
	})();
}