var http = require('http');
var io = require('socket.io');

server = http.createServer();
server.listen(8081);

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