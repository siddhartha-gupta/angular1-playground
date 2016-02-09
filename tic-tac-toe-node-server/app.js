var http = require('http'),
	connect = require('connect'),
	serveStatic = require('serve-static'),
	app = connect(),
	io = null,
	fs = require('fs')

app.use(serveStatic(__dirname));

var server = http.createServer(app);
io = require('socket.io').listen(server);
server.listen(5000);

var clients = {};

io.sockets.on('connection', function(socket) {
	socket.on('register-email', function(data) {
		registerEmail(socket, data);
	});

	socket.on('add-recipient', function(data) {
		var resp = '';

		if (clients.hasOwnProperty(data.emailId)) {
			clients[data.emailId].recipient = data.recipient;
			console.log(clients);
			resp = 'Recipient added successfully';
		} else {
			resp = 'Error in adding recipient';
		}
		// Send resp back to user
		socket.emit('add-recipient-resp', resp);
	});

	socket.on('send-message', function(data) {
		console.log("time to send private-message: ", data);
		console.log("clients: ", clients);

		if (clients[data.recipient]) {
			io.sockets.connected[clients[data.recipient].socket].emit("add-message", data);
		} else {
			console.log("User does not exist: " + data.recipient);
		}
		socket.emit('send-message-resp', resp);
	});

	//Removing the socket on disconnect
	socket.on('disconnect', function() {
		for (var name in clients) {
			if (clients[name].socket === socket.id) {
				delete clients[name];
				break;
			}
		}
	})
});

function registerEmail(socket, data) {
	var resp = '',
		players;

	if (!clients.hasOwnProperty(data.emailId)) {
		clients[data.emailId] = {
			'socket': socket.id,
			'username': data.username
		};
		console.log(clients);
		resp = 'Email registered successfully';
		players = getPlayersList();

		io.sockets.emit('current-players-list', players);
	} else {
		resp = 'Email id is already in use';
	}
	// Send resp back to user
	socket.emit('register-email-resp', resp);
}

function getPlayersList() {
	var list = {};
	for (var key in clients) {
		list[key] = {
			username: clients[key].username,
			emailId: key
		}
	}

	return list;
}
