var Map = (function() {
	function Map(scene) {
		scene.fog = new THREE.FogExp2( 0xf1f9ff, 0.002 );
		
		var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x000000, specular: 0x333333, wireframe: true }  );
		var geometry = new THREE.Plane(3000, 3000, 40, 40);
		
		for(var i = 0, len = geometry.vertices.length; i < len; i++) {
			geometry.vertices[i].position.z = Math.cos(i*.01) * 70;
		}
		
		this.ground = new THREE.Mesh(geometry, material);
		
		this.ground.rotation.x = (Math.PI * 3)/2;
		this.ground.position.y = -100;
		
		THREE.Collisions.colliders.push( THREE.CollisionUtils.MeshColliderWBox(this.ground));
		
		scene.addObject(this.ground);
		
		var light1 = new THREE.DirectionalLight( 0xf1f9ff, 1.2, 10000, false );
		
		light1.position.z = 0;
		light1.position.x = 0;
		light1.position.y = 8000;
		
		scene.addLight( light1 );
	}
	
	return Map;
})();