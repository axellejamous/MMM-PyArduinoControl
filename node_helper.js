'use strict';
const NodeHelper = require('node_helper');

const PythonShell = require('python-shell');
#var pythonStarted = false;

module.exports = NodeHelper.create({
	
	python_start: function () {
		const self = this;
		const pyshell = new PythonShell('modules/' + this.name + '/python/mqttcontroller.py', { mode: 'json', args: [JSON.stringify(this.config)]});
