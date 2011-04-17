var Shooter = function(container) {
	var shooter = this,
		container = container,
		camera,
		scene,
		renderer,
		ship,
		map,
		keyHandler
	;
	
	this.update = function() {
		keyHandler.trigger();
		ship.update();
		camera.update();
	};
	
	this.render = function() {
		renderer.render();
	};
	
	(function() {
		camera = new Camera();
		scene = new THREE.Scene();
		scene.fog = new THREE.FogExp2( 0xf1f9ff, 0.0009 );
		
		map = new Map(scene);
		ship = new Ship(scene);
		
		camera.target = ship;
		
		keyHandler = new KeyHandler();
		keyHandler.add(38, true, ship.accelerate);
		keyHandler.add(37, true, ship.turnLeft);
		keyHandler.add(39, true, ship.turnRight);
		keyHandler.add(40, true, ship.deaccelerate);
		keyHandler.add(32, true, ship.boost);
		
		renderer = new Renderer(container, scene, camera.camera);
	})();
}