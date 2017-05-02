/**
 * Created by revan on 3/17/2017.
 */
var mqtt = require('mqtt');
var mqttConf = require('../configuration')('mqtt');
module.exports = function (app) {
    try{
        app.post('/controlDevices',function (req,res) {
            console.log(req.body)
            //var mqttClient = mqtt.connect('mqtt://test.mosquitto.org');
            var mqttClient = mqtt.connect(mqttConf.url);
            mqttClient.on('connect',function (message) {

                mqttClient.publish('smartHomeTest',req.body.operation + " " + req.body.location + " " + req.body.device);
                mqttClient.end()
            })
            res.setHeader('Content-Type', 'application/json');
            res.send(req.body);
        })
    } catch(err){
        console.log(err)
    }

}