var Ship = (function() {
	function Ship(scene) {
		var that = this;
		
		this.scene = scene;
		
		this.timer = 0;
		this.obj = null;
		this.momentum = 0;
		this.angle = 0;
		this.rotation = 0;
		
		loader = new THREE.JSONLoader( true );
		loader.load({ model: "models/ship.js", callback: function( geometry ) { that.modelLoaded.call(that, geometry); }});
	}
	
	Ship.prototype.modelLoaded = function(geometry) {
		var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x000000, specular: 0x333333, wireframe: false }  );
		this.obj = THREE.SceneUtils.addMesh( this.scene, geometry, 1, 0, 0, 0, 0, 0, 0, material );
		this.obj.position.y = 100;
		
		var material = new THREE.MeshPhongMaterial( { color: 0x000000, wireframe: true }  );
		var geometry = new THREE.Cube(40, 20, 30);
		this.hitbox = new THREE.Mesh(geometry, material);
		this.hitbox.position.z = -10;
		
		this.obj.addChild(this.hitbox);
	}
	
	Ship.prototype.updateRotation = function() {
		this.obj.rotation.y = this.rotation;
	}
	
	Ship.prototype.destroy = function() {
		this.scene.removeObject(this.obj);
	}
	
	return Ship;
})();