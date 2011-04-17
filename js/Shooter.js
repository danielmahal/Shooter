var Shooter = function(container) {
	var shooter = this,
		container = container,
		camera,
		scene,
		renderer,
		ship,
		map,
		keyListener
	;
	
	this.update = function() {
		ship.update();
		camera.update();
	};
	
	this.render = function() {
		renderer.render();
	};
	
	(function() {
		camera = new Camera();
		scene = new THREE.Scene();
		
		map = new Map(scene);
		ship = new Ship(scene);
		
		camera.target = ship;
		
		KeyHandler = new KeyHandler();
		KeyHandler.add(38, true, ship.accelerate);
		KeyHandler.add(37, true, ship.turnLeft);
		KeyHandler.add(39, true, ship.turnRight);
		KeyHandler.add(40, true, ship.deaccelerate);
		
		renderer = new Renderer(container, scene, camera.camera);
	})();
}