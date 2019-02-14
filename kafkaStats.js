var zookeeper = require('node-zookeeper-client');
 
var client = zookeeper.createClient('localhost:2181');
var state = client.getState();

console.log("Current state: $s", state)
 
client.connect();