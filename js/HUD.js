var HUD = (function() {
	function HUD(ship) {
		this.crosshair = null;
		this.ship = ship;
	}
	
	HUD.prototype.update = function() {
		if(this.crosshair == null && this.ship.obj != undefined) {
			this.createCrosshair();
		}
	}
	
	HUD.prototype.createCrosshair = function() {
		var geometry = new THREE.Cube(5, 5, 5);
		var material = new THREE.MeshPhongMaterial( { ambient: 0x333333, color: 0x000000, specular: 0x333333, wireframe: false }  );
		this.crosshair = new THREE.Mesh( geometry, material );
		this.crosshair.position.z = 500;
		this.ship.obj.addChild(this.crosshair);
	}
	
	return HUD;
})();