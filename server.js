// var http = require('http');
var io = require('socket.io');
var express = require('express');
var app = express.createServer();

app.configure(function(){
    app.use(express.methodOverride());
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(__dirname));
});
// 
app.get('/', function(req, res){
	res.send('hello world');
});

// server.configure('development', function(){
//     server.use(express.static(__dirname));
//     server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });

app.listen(9984);

// var server = http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\nApp (shooter) is running..');
// });
// 
// server.listen(9984);
// 
// var socket = io.listen(server); 
// socket.on('connection', function(client){
// 	var id = client.sessionId;
// 	
// 	client.send({
// 		'type': 'welcome',
// 		'id': id
// 	});
// 	
// 	client.on('message', function(data){
// 		data.id = id;
// 		socket.broadcast(data);
// 	});
// 	
// 	client.on('disconnect', function(){
// 		socket.broadcast({
// 			'type': 'userDisconnect',
// 			'id': id
// 		});
// 	}); 
// });