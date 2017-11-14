/* Magic Mirror
 * Module: MMM-PyArduinoControl
 *
 * By Axelle Jamous
 * Based on https://github.com/paviro/MMM-Facial-Recognition
 */

 Module.register('MMM-PyArduinoControl',{
    defaults: {
        //example
        welcomeMessage: true        
    },
    
    button_press : function(){
        //show something on the screen or do something
    },

    // Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		if (payload.action == "btnPressed"){
            button_press();
        }
            //example
            if (this.config.welcomeMessage) {
				//this.sendNotification("SHOW_ALERT", {type: "notification", message: this.translate("message").replace("%person", this.current_user), title: this.translate("title")});
			}
		else if (payload.action == "otherAction"){
            //do something else
		}
	},


    notificationReceived: function(notification, payload, sender) {
		if (notification === 'DOM_OBJECTS_CREATED') {
            var self = this;
			MM.getModules().exceptWithClass("default").enumerate(function(module) {
				module.hide(1000, function() {
					Log.log('Module is hidden.');
				}, {lockString: self.identifier});
			});
		}
	},

	start: function() {
		this.current_user = null;
		this.sendSocketNotification('CONFIG', this.config);
		Log.info('Starting module: ' + this.name);
	}
 });