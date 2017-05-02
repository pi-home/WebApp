var mqtt = require('./mqttConf');

module.exports = function(value){
    switch(value){
        case 'mqtt':
            return mqtt 
    }
}