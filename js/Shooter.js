var Shooter = (function() {
	function Shooter(container) {
		this.container = container;
		
		this.camera = new Camera();
		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.FogExp2( 0xf1f9ff, 0.0012 );
		this.keyHandler = new KeyHandler();
		
		this.map = new Map(this.scene);
		this.ship = new Ship(this.scene);
		
		this.camera.target = this.ship;
		
		this.keyHandler.add(38, this.ship, this.ship.accelerate);
		this.keyHandler.add(37, this.ship, this.ship.turnLeft);
		this.keyHandler.add(39, this.ship, this.ship.turnRight);
		this.keyHandler.add(40, this.ship, this.ship.deccelerate);
		
		this.renderer = new Renderer(this.container, this.scene, this.camera.camera);
	}
	
	Shooter.prototype.update = function() {
		this.keyHandler.trigger();
		this.ship.update();
		this.camera.update();
	}
	
	Shooter.prototype.render = function() {
		this.renderer.render();
	}
	
	return Shooter;
})();