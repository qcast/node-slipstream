var Q = require('q');
var async = require('async');

var jenkinsapi = require('jenkins-api');
var jenkins = jenkinsapi.init(process.env.JENKINS_PORT_8080_TCP.replace('tcp', 'http'));

jenkins.allJobs = function() {
	var deferred = Q.defer();
	jenkins.all_jobs(function(err, jobs) {
		if (err) {
			console.log('all_jobs failed');
			deferred.reject(err);
			return;
		}
		async.map(jobs, function(job, cb) {
			jenkins.job(job.name).then(function(job) {
				cb(null, job);
			}).fail(cb);
		}, function(err, jobs) {
			async.filter(jobs, function(job, filter) {
				filter(job.metadata && job.metadata.slipstream);
			}, function(filtered) {
				deferred.resolve(filtered);
			});
		});
	});
	return deferred.promise;
};

jenkins.job = function(job) {
	var deferred = Q.defer();
	jenkins.job_info(job, function(err, job) {
		if (err) {
			deferred.reject(err);
			return;
		}
		try {
			job.metadata = JSON.parse(job.description);
		} catch (err) {}
		deferred.resolve(job);
	});
	return deferred.promise;
};

module.exports = jenkins;
