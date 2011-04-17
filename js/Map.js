var Map = (function() {
	function Map(scene) {
		var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x000000, specular: 0x000000, shading: THREE.SmoothShading }  );
		var ground = new THREE.Mesh(new THREE.Plane(1000, 1000, 1, 1), material);
		
		ground.rotation.x = (Math.PI * 3)/2;
		ground.position.y = -100;
		
		scene.addObject(ground);
		
		var light1 = new THREE.DirectionalLight( 0xf1f9ff, 1, 10000, true );
		
		light1.position.z = -200;
		light1.position.x = -200;
		light1.position.y = 8000;
		
		scene.addLight( light1 );
	}
	
	return Map;
})();