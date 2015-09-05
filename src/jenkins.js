var jenkinsapi = require('jenkins-api');
var jenkins = jenkinsapi.init(process.env.JENKINS_PORT_8080_TCP.replace('tcp', 'http'));

module.exports = jenkins;
