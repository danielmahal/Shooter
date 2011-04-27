var PlayerShip = (function() {
	var delayMultiplier = 1;
	var delayMultiplierVector = new THREE.Vector3(delayMultiplier,delayMultiplier,delayMultiplier);
	
	function PlayerShip(scene, keyHandler) {
		this.targetPosition = new THREE.Vector3(0,0,0);
		this.targetRotation = new THREE.Vector3(0,0,0);
		
		PlayerShip.parent.constructor.call(this, scene);
	}
	
	Husky.extend(PlayerShip, Ship);
	
	PlayerShip.prototype.update = function() {
		if(this.obj == null) {
			return;
		}
		
		var positionDiff = this.targetPosition.clone().subSelf(this.obj.position);
		var rotationDiff = this.targetRotation.clone().subSelf(this.obj.rotation);
		
		this.obj.position.addSelf(positionDiff.multiplySelf(delayMultiplierVector));
		this.obj.rotation.addSelf(rotationDiff.multiplySelf(delayMultiplierVector));
	}
	
	return PlayerShip;
})();