
module.exports = function(app){
    require('./socket')(app);
    app.get('/online', function(req, res, next){
        res.render('online');
    });
}