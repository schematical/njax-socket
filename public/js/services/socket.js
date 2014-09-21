var NJaxSocketService = angular.module('njax.socket.service', []);
NJaxSocketService.factory(
    'NJaxSocketService',
    [
        '$rootScope',
        function($rootScope){
            return {
                init:function($rootScope){
                    var socket = io.connect('http://' + window.njax_socket_www_url);
                    socket.on('say_hello', function(data){
                        socket.emit('greeting', { user:window.njax_bootstrap.user });
                    });
                    socket.on('event', function(event){
                        $rootScope.$emit(event.event, event.data);
                    });
                }
            }
        }
    ]
);



