
module.exports = function(app){
    app.njax.callbacks.listen('.*', function(event, data, cb){
        var account = data._account;
        /*var event = data.event;*/
        var user_data = app.njax.online_users[account.namespace] || app.njax.online_users[account._id];
        if(!user_data){
            return cb();
        }
        user_data.emit(
			'event',
			{
				event: event,
				data: data
			}
		);
        return cb();
    });
}