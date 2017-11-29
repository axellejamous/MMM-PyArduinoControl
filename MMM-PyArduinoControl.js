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
    },
	
	/**
     * MQTT Section
     * @description sets up mqtt connector, listener and publisher 
     */
	client:on('connect', function () {
		client.subscribe(setup_topic)
		client.publish(setup_topic, 'Hello from MagicMirror side')
	}),
	  
	client:on('message', function (topic, message) {
		// message is Buffer
		console.log(message.toString())
		//client.end()
	}),
	
    notificationReceived: function(notification, payload, sender) {
        if (notification === "STOP_ALARM"){
            Log.info("PyArduinoControl module says: Alarm stop received."); 
			
			// Send the command to signal the Arduino that it can start setting coffee
			client.publish(snd_topic, "set_coffee");
		}
	},

	// Main
	start() {
		//this.sendSocketNotification('CONFIG', this.config);
		Log.info(`Starting module: ${this.name}`);
	}
 });