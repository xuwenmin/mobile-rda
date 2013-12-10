var io = require('socket.io').listen(8080);

var count = 1;
io.sockets.on('connection', function(socket) {
	setInterval(function() {
		socket.emit('news', {
			hello: ++count
		});
	}, 1000);

	socket.on('my other event', function(data) {
		console.log(data);
	});
});