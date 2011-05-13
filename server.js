var http = require('http');
var io = require('socket.io');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\nApp (shooter) is running..');
}).listen(process.ENV['app_port']);

var socket = io.listen(server); 
socket.on('connection', function(client){
	var id = client.sessionId;
	
	client.send({
		'type': 'welcome',
		'id': id
	});
	
	client.on('message', function(data){
		data.id = id;
		socket.broadcast(data);
	});
	
	client.on('disconnect', function(){
		socket.broadcast({
			'type': 'userDisconnect',
			'id': id
		});
	}); 
});