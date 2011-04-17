var Ship = (function() {
	function Ship(scene) {
		var that = this;
		
		this.scene = scene;
		
		this.timer = 0;
		this.obj = null;
		this.momentum = 0;
		this.angle = 0;
		this.rotation = 0;
		
		// var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x000000, specular: 0xaaaaaa, shininess: 20, shading: THREE.SmoothShading }  );
		
		// this.uniforms2 = {
		// 	time: { type: "f", value: 1.0 },
		// 	resolution: { type: "v2", value: new THREE.Vector2() },
		// 	texture: { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( "libs/three-js/examples/textures/disturb.jpg" ) }
		// };
		
		// this.uniforms2.texture.texture.wrapS = this.uniforms2.texture.texture.wrapT = THREE.Repeat;
		
		var material = new THREE.MeshShaderMaterial({
			uniforms: {
				shipColor: THREE.Color(0x00FFFF)
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