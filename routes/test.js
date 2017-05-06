var mqtt = require('mqtt');
var mqttConf = require('../configuration')('mqtt');
module.exports = function (app) {
    try{
        app.post('/test',function (req,res) {
            console.log(req.body)
            //var mqttClient = mqtt.connect('mqtt://test.mosquitto.org');
            var mqttClient = mqtt.connect(mqttConf.url);
            mqttClient.on('connect',function (message) {

                mqttClient.publish('smartHomeTest', "Mobile Test");
                mqttClient.end()
            })
            res.setHeader('Content-Type', 'application/json');
            res.send(req.body);
        })
    } catch(err){
        console.log(err)
    }

}