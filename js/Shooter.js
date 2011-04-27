var Shooter = (function() {
	function Shooter(container) {
		this.model = {
			ships: {}
		};
		
		this.container = container;
		
		this.keyHandler = new KeyHandler();
		
		this.model.camera = new Camera();
		this.model.scene = new THREE.Scene();
		
		this.model.map = new Map(this.model.scene);
		this.model.userShip = new UserShip(this.model.scene, this.keyHandler);
		
		this.model.hud = new HUD(this.model.userShip);
		
		this.model.camera.target = this.model.userShip;
		
		this.socketHandler = new SocketHandler(this.model);
		
		this.renderer = new Renderer(this.container, this.model.scene, this.model.camera.camera);
	}
	
	Shooter.prototype.update = function() {
		this.keyHandler.trigger();
		
		for(i in this.model.ships) {
			this.model.ships[i].update();
		}
		
		this.model.userShip.update();
		this.model.userShip.sendUpdate(this.socketHandler);
		
		this.model.hud.update(this.model.userShip);
		
		this.model.camera.update();
	}
	
	Shooter.prototype.render = function() {
		this.renderer.render();
	}
	
	return Shooter;
})();