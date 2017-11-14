'use strict';
const NodeHelper = require('node_helper');

const PythonShell = require('python-shell');
var pythonStarted = false;

module.exports = NodeHelper.create({
	
	python_start: function () {
		const self = this;
		const pyshell = new PythonShell('modules/' + this.name + '/python/mqttcontroller.py', { mode: 'json', args: [JSON.stringify(this.config)]});
	
		pyshell.on('payload', function(payload){
			if (payload.hasOwnProperty('btnPressed')){
				console.log("[" + self.name + "] " + payload.btnPressed);				
				
				//do something when button pressed
				//see https://github.com/paviro/MMM-Facial-Recognition/blob/master/node_helper.js#L20
				self.sendSocketNotification('');
			}

		});

		pyshell.end(function (err) {
			if (err) throw err;
			console.log("[" + self.name + "] " + "finished running.");
		});
	},
	
	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if(notification === 'CONFIG') {
    		this.config = payload
    		if(!pythonStarted) {
    			pythonStarted = true;
    			this.python_start();
        	};
    	};
  	}
});