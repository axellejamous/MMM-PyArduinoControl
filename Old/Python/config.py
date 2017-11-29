#!/usr/bin/python
# coding: utf8
"""MMM-PyArduinoControl - MagicMirror Module
Based on work by Paul-Vincent Roll (Copyright 2016) (MIT License)
"""
import os
import json
import sys

def to_node(type, message):
    print(json.dumps({type: message}))
    sys.stdout.flush()
