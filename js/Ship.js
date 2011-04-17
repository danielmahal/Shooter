var Ship = (function() {
	function Ship(scene) {
		var that = this;
		
		this.scene = scene;
		
		this.timer = 0;
		this.obj = null;
		this.momentum = 0;
		this.angle = 0;
		this.rotation = 0;
		
		this.shipColor = new THREE.Vector3(1, 0, 0);
		
		var material = new THREE.MeshShaderMaterial({
			uniforms: {
				shipColor: { type: "v3", value: this.shipColor }
			},
			vertexShader: document.getElementById('vertexShader').textContent,
			fragmentShader: document.getElementById('fragment_shader2').textContent
		});
		
		loader = new THREE.JSONLoader( true );
		
		loader.load({
			model: "models/ship.js",
			callback: function( geometry ) {
				that.obj = THREE.SceneUtils.addMesh( scene, geometry, 20, 0, 0, 0, 0, 0, 0, material );
				// that.shadow = new THREE.ShadowVolume( that.obj );
			}
		});
	}
	
	Ship.prototype.updateRotation = function() {
		this.obj.rotation.y = this.rotation;
	}
	
	Ship.prototype.destroy = function() {
		this.scene.removeObject(this.obj);
	}
	
	return Ship;
})();