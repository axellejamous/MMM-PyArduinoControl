/* Magic Mirror
 * Module: MMM-PyArduinoControl
 *
 * By Axelle Jamous
 * Based on https://github.com/paviro/MMM-Facial-Recognition
 */
var mqtt = require('mqtt')
//var broker = "172.20.10.5"
//var client  = mqtt.connect(broker)


Module.register('MMM-PyArduinoControl',{
	//	Variables
	snd_topic = "coffee/rcver",
	rcv_topic = "coffee/snder",
	setup_topic = "setup",
	client  = mqtt.connect('mqtt://test.mosquitto.org'),

	defaults: {
        //example
        welcomeMessage: true        
    },
	
	/**
     * MQTT Section
     * @description sets up mqtt connector, listener and publisher 
     */
	client:on('connect', function () {
		client.subscribe(setup_topic)
		client.publish('presence', 'Hello from MagicMirror side')
	}),
	  
	client:on('message', function (topic, message) {
		// message is Buffer
		console.log(message.toString())
		client.end()
	}),
	
    notificationReceived: function(notification, payload, sender) {
        if (this.alarmFired){
            if (notification === "STOP_ALARM"){
                Log.info('Alarm stopped!'); 
                this.resetAlarmClock();         
            }
        }
	},

	// Main
	start: function() {
		//this.sendSocketNotification('CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	}
 });