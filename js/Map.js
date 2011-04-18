var Map = (function() {
	function Map(scene) {
		scene.fog = new THREE.FogExp2( 0xf1f9ff, 0.002 );
		
		var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x000000, specular: 0x333333, wireframe: false }  );
		var geometry = new THREE.Plane(3000, 3000, 20, 20);
		
		for ( var i = 0, l = geometry.vertices.length; i < l; i ++ ) {
			geometry.vertices[ i ].position.z = Math.random()*80;
		}
		
		this.ground = new THREE.Mesh(geometry, material);
		
		this.ground.rotation.x = (Math.PI * 3)/2;
		// this.ground.position.y = -100;
		
		scene.addObject(this.ground);
		
		THREE.Collisions.colliders.push(THREE.CollisionUtils.MeshColliderWBox(this.ground));
		
		// console.log(THREE.CollisionUtils.MeshColliderWBox(this.ground));
		
		var light1 = new THREE.DirectionalLight( 0xf1f9ff, 1.2, 10000, false );
		
		light1.position.z = 0;
		light1.position.x = 0;
		light1.position.y = 8000;
		
		scene.addLight( light1 );
	}
	
	return Map;
})();