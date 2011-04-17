var Map = function(scene) {
	
	
	(function() {
		var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x000000, specular: 0xffffff, shininess: 50, shading: THREE.SmoothShading }  );
		var ground = new THREE.Mesh(new THREE.Plane(1000, 1000, 0, 0), material);
		
		ground.position.y = -100;
		ground.rotation.x = 80;
		
		scene.addObject(ground);
		
		var light1 = new THREE.DirectionalLight( 0xffffff, 1, 100, true );
		
		light1.position.z = -200;
		light1.position.x = -200;
		light1.position.y = 400;
		
		scene.addLight( light1 );
	})();
}