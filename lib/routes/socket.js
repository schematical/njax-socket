var path = require('path');
var fs = require('fs');


module.exports = function(app){
    app.all('/js/socket.js', function(req, res, next){
        var rendered = 'window.njax_socket_www_url = "' + req.www_url + '";\n';
        var js_path = path.join(app.njax.config.njax_socket_dir, 'public', 'js', 'services', 'socket.js')
        rendered += fs.readFileSync(js_path);
        res.send(rendered);
    })
}