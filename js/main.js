var runLoop = function() {
	requestAnimationFrame(runLoop);
	
	app.update();
	app.render();
}

var app = new Shooter(document.getElementById('container'));
runLoop();

document.addEventListener('keydown', app.keydown);
document.addEventListener('keyup', app.keyup);