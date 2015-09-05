var request = require('superagent');
var async = require('async');

var jenkins = require('../jenkins');

module.exports = function(app) {

	app.get('/api/:app/:version/artifact', function(req, res) {
		var app = req.params.app;
		var version = req.params.version;
		jenkins.build(app, version).then(function(build) {
			var artifactUrl = data.url + 'artifact/' + data.artifacts[0].relativePath;
			request.get(artifactUrl).pipe(res);
		}).fail(function(err) {
			res.status(500);
			res.send(err);
		});
	});

	app.get('/api/:app/:version', function(req, res) {
		var app = req.params.app;
		var version = req.params.version;

		jenkins.build(app, version).then(function(build) {
			res.send(build);
		}).fail(function(err) {
			res.status(500);
			res.send(err);
		});
	});

	app.get('/api/projects', function(req, res) {
		console.log('calling all jobs');
		jenkins.allJobs().then(function(jobs) {
			res.send(jobs);
		}).fail(function(err) {
			res.status(500);
			res.send(err);
		});
	});

	app.get('/api/:app', function(req, res) {
		var app = req.params.app;
		jenkins.job(app).then(function(job) {
			res.send(job);
		}).fail(function(err) {
			res.status(500);
			res.send(err);
		});
	});

};
