var Camera = function() {
	var that = this;
	
	var distance = 150;
	
	this.target = null;
	
	this.setTarget = function(obj) {
		that.target = obj;
	};
	
	this.update = function() {
		if(that.target.obj != null) {
			that.camera.fov = 20;
			
			that.camera.target.position.x = that.target.obj.position.x;
			that.camera.target.position.z = that.target.obj.position.z;
			
			var targetPosition = {
				x: that.target.obj.position.x - Math.sin(that.target.rotation) * distance,
				z: that.target.obj.position.z - Math.cos(that.target.rotation) * distance
			}
			
			that.camera.position.x += (targetPosition.x - that.camera.position.x) * .1;
			that.camera.position.z += (targetPosition.z - that.camera.position.z) * .1;
		}
	};
	
	(function() {
		that.camera = new THREE.Camera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
		
		that.camera.position.y = 80;
		that.camera.target.position.y = 40;
	})();
}