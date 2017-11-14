# MMM-PyArduinoControl

## https://github.com/paviro/MMM-Facial-Recognition was used as a base for this code      

This module is meant to control Arduino boards with WiFi connectivity through the use of MQTT so that notifications can be sent when stuff happens and pulses get sent when stuff needs to happen.

More specifically, in this case, this module will control:
-a coffee machine
-a light bulb

Both are connected to an arduino that is connected to the RaspberryPi through a WiFi module. The connection happens through the use of MQTT in Python.        
Both will be able to be triggered in two ways, using two other modules:
  1. Voice control https://github.com/alexyak/voicecontrol        
  2. Alarm https://github.com/fewieden/MMM-AlarmClock

How:
  1. Voice control: by saying "LIGHTS ON" and "SET COFFEE"
  2. When the alarm is sounded it will ask the User if he wants Coffee, if "YES" is replied in voice control, it will get set. The light bulb will automatically light gradually.
