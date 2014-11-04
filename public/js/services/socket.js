var NJaxSocketService = angular.module('njax.socket.service', ['njax.bootstrap']);
NJaxSocketService.factory(
    'NJaxSocketService',
    [
		'NJaxBootstrap',
        function(NJaxBootstrap){
            return {
                init:function($rootScope){
                    var socket = io.connect('http://' + NJaxBootstrap.socket_server.host);
                    socket.on('say_hello', function(data){
                        socket.emit('greeting', { user:NJaxBootstrap.user });
                    });
                    socket.on('event', function(event){
                        $rootScope.$emit(event.event, event.data);
                    });
                }
            }
        }
    ]
);



