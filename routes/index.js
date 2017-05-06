var controllers = require('./homeController');
var dashboard = require('./dashboardRoutes')
var test = require('./test');

module.exports = function(app,passport) {
    controllers(app);
    dashboard(app,passport)
    test(app);
    try{
        app.post('/apiCheck',function(req,res){
             console.log("Inside")
             console.log(req.body.hello);
             res.setHeader('Content-Type', 'application/json');
             res.send(JSON.stringify({  status : "request received" }));
        })
    } catch(err) {
        console.log(err);
    }
}