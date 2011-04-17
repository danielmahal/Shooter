var Renderer = function(container, scene, camera) {
	var that = this,
		renderer
	;
	
	this.render = function() {
		renderer.render(scene, camera);
	};
	
	(function() {
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );
	})();
}