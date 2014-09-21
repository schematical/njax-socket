
module.exports = function(app){
    app.njax.callbacks.listen("*", function(event, data, cb){
        console.log(data);
        //app.njax.socket.trigger(event, )
    });
}