#!/usr/bin/python
# coding: utf8
"""MMM-PyArduinoControl - MagicMirror Module
Based on work by Paul-Vincent Roll (Copyright 2016) (MIT License)
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
"""

import sys
import json
import config
import os
#from time import strftime, sleep
import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish

def to_node(type, message):
    # convert to json and print (node helper will read from stdout)
    try:
        print(json.dumps({type: message}))
    except Exception:
        pass
    # stdout has to be flushed manually to prevent delays in the node helper communication
    sys.stdout.flush()

to_node("status", "Pyarduinocontrol module started...")

############### MQTT #################
Broker = "192.168.1.118"

snd_topic = "home/receiver" #sub to messages on this topic
rcv_topic = "home/alarmer" #publish messages to this topic

# When connecting:
def on_connect(mqttc, obj, flags, rc):
    print("rc: "+str(rc))
    mqttc.subscribe(rcv_topic) #sub

# When receving a message:
def on_message(mqttc, obj, msg):
    print("subscribing.")
    print(msg.topic+" "+str(msg.qos)+" "+str(msg.payload))
    try:
        p = msg.payload.decode("utf-8")
        print("decoded payload: " + p)

        x = json.loads(p)
        handle_values(tuple(x['values']))
        return
    except Exception as e:
        print(e)

# When subscribing:
def on_subscribe(mqttc, obj, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))

# Assign functions to mqtt
mqttc = mqtt.Client()
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.on_subscribe = on_subscribe
mqttc.connect(Broker, 1883, 60)
mqttc.loop_start() #or client.loop_forever()

def snd_msg(buttonHeld, toggle):
    dataToSend=json.dumps({"values":[buttonHeld,toggle]})
    print("sending data through mqtt: " + dataToSend)
    mqttc.publish(snd_topic, dataToSend)

############### functions ###############
def main():
    

# Main Loop
if __name__ == '__main__':
    while True:
        main()
    

