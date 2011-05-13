var http = require('http');
var io = require('socket.io');
var fs = require('fs');
var path = require("path");
var url = require("url");

var server = http.createServer(function (request, response) {
	var uri = url.parse(request.url).pathname;
	var filename = path.join(process.cwd(), uri);
	path.exists(filename, function(exists) {
		if(exists) {
			fs.readFile(filename, "binary", function(err, file) {
				if(!err) {
					response.writeHead(200, {"Content-Type": "text/html"});
					response.write(file, "binary");
					response.end();
				}
			});
		}
	});
});

server.listen(9984);

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