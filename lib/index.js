var async = require('async');
var _ = require('underscore');
var path = require('path');


var config = {
    
};
var njax_app = require('njax-app');
var njax_socket = function(options){

    var app = njax_app(options);
    app.njax.config.njax_socket_dir = path.join(__dirname, '..');
    if(!app.njax.config.njax_socket_tpl_dir){
        app.njax.config.njax_socket_tpl_dir = path.join(__dirname, '..', 'public', 'templates');
    }
    app.njax.addTemplateDir(app.njax.config.njax_socket_tpl_dir);
    app.locals.ng_app = 'njax-socket';
    app.locals.partials._meta_footer = path.join(app.njax.config.njax_socket_tpl_dir, '_meta_footer');
    require('./module')(app);
    require('./events')(app);
    require('./routes')(app);

    var _start = _.bind(app.start, app);
    app.start = function(cb){
        return _start(function(err, _app, server){
            if(err) throw err;
            app.njax.socket.init(server, function(err){
                return cb(err, _app, server);
            });
        });
    }
    return app;

}

module.exports = njax_socket;