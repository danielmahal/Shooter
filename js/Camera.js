var Camera = (function() {
	var distance = 150;
	
	function Camera() {
		this.target = null;
		
		this.camera = new THREE.Camera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
		
		this.camera.position.y = 80;
		this.camera.target.position.y = 40;
	}
	
	Camera.prototype.setTarget = function(obj) {
		this.target = obj;
	}
	
	Camera.prototype.update = function() {
		if(this.target.obj != null) {
			this.camera.fov = 20;
			
			this.camera.target.position.x = this.target.obj.position.x;
			this.camera.target.position.z = this.target.obj.position.z;
			
			var targetPosition = {
				x: this.target.obj.position.x - Math.sin(this.target.rotation) * distance,
				z: this.target.obj.position.z - Math.cos(this.target.rotation) * distance
			}
			
			this.camera.position.x += (targetPosition.x - this.camera.position.x) * .1;
			this.camera.position.z += (targetPosition.z - this.camera.position.z) * .1;
		}
	}
	
	return Camera;
})();