var Q = require('q');

var jenkinsapi = require('jenkins-api');
var jenkins = jenkinsapi.init(process.env.JENKINS_PORT_8080_TCP.replace('tcp', 'http'));

jenkins.job = function (job) {
	var deferred = Q.defer();
	jenkins.job_info(job, function(err, job) {
		if (err) {
			deferred.reject(err);
			return;
		}
		job.metadata = JSON.parse(job.description);
		console.log(job);
		deferred.resolve(job);
	});
	return deferred.promise;
};

module.exports = jenkins;
