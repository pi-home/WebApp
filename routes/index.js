var controllers = require('./homeController');
var dashboard = require('./dashboardRoutes')

module.exports = function(app,passport) {
    controllers(app);
    dashboard(app,passport)
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