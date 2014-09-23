var async = require('async');
var _ = require('underscore');
var socket_io = require('socket.io');
module.exports = function(app){
    app.njax.socket = {
        init:function(server){
            app.njax.online_users = {};
            var io = socket_io.listen(server);

            io.sockets.on('connection', app.njax.socket.onConnection);
        },
        onConnection:function(socket){


            socket.emit('say_hello', { hello: 'world' });
            socket.on('greeting', _.bind(app.njax.socket.onGreeting, socket));

        },
        onGreeting:function(data){
            console.log("Greetings:", data);
            if(!data.user){
                //TODO: Eventually track "guest" activities
                console.log("Guest online");
                return false;//USER IS NOT LOGGED IN
            }
            if(!app.njax.online_users[data.user._id]){
                app.njax.online_users[data.user._id] = {
                    sockets:[],
                    user:data.user,
                    emit:function(event, data){
                        for(var i in this.sockets){
                            this.sockets[i].emit(event, data);
                        }
                    }
                };
            }
            app.njax.online_users[data.user._id].sockets.push(this);

        },
        on:function(event, callback){
            this.socket.on(event, callback);
        }
    }
}