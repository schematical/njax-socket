
var socket_io = require('socket.io');
module.exports = function(app){
    app.njax.socket = {
        init:function(server){
            app.njax.online_users = {};
            var io = socket_io.listen(server);

            io.sockets.on('connection', app.njax.socket.onConnection);
        },
        onConnection:function(socket){
            socket.on('someShit', function (data) {});

            socket.emit('say_hello', { hello: 'world' });
            socket.on('greeting', app.njax.socket.onGreeting);

        },
        onGreeting:function(data){
            console.log("Greetings:", data);
            app.njax.online_users[data.user._id] = data.user;

        }
    }
}