var updateLoop = function() {
	requestAnimationFrame(updateLoop);
	app.update();
}

var renderLoop = function() {
	requestAnimationFrame(renderLoop);
	app.render();
	stats.update();
}

var container = document.getElementById('container');

var app = new Shooter(container);

stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
container.appendChild( stats.domElement );

updateLoop();
renderLoop();