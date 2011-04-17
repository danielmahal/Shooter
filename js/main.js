

var updateLoop = function() {
	requestAnimationFrame(updateLoop);
	app.update();
}

var renderLoop = function() {
	requestAnimationFrame(renderLoop);
	app.render();
}

var app = new Shooter(document.getElementById('container'));

updateLoop();
renderLoop();

document.addEventListener('keydown', app.keydown);
document.addEventListener('keyup', app.keyup);

