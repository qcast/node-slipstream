var request = require('superagent');
var async = require('async');

var jenkins = require('../jenkins');

module.exports = function(app) {

	app.get('/api/:app/:version/artifact', function(req, res) {
		var app = req.params.app;
		var version = req.params.version;
		var callback = function(err, data) {
			if (err) {
				res.status(500);
				res.send(err);
			} else {
				var artifactUrl = data.url + 'artifact/' + data.artifacts[0].relativePath;
				request.get(artifactUrl).pipe(res);
			}
		};

		if (version === 'latest') {
			jenkins.last_build_info(app, callback);
		} else {
			jenkins.build_info(app, version, callback);
		}
	});

	app.get('/api/:app/:version', function (req, res) {
		var app = req.params.app;
		var version = req.params.version;
		var callback = function(err, data) {
			if (err) {
				res.status(500);
				res.send(err);
			} else {
				res.send(data);
			}
		};

		if (version === 'latest') {
			jenkins.last_build_info(app, callback);
		} else {
			jenkins.build_info(app, version, callback);
		}
	});

	app.get('/api/:app', function (req, res) {
		var app = req.params.app;
		jenkins.job(app).then(function(job) {
			res.send(job);
		}).fail(function(err) {
			res.status(500);
			res.send(err);
		});
	});

	app.get('/api/projects', function(req, res) {
		jenkins.all_jobs(function(err, data) {
			async.map(data, function (job, cb) {
				jenkins.job_info(job.name, function (err, job) {
					console.log(job.description);
					cb(err, job);
				});
			}, function (err, projects) {
				async.filter(projects, function (project) {
					return project.description === 'slipstream';
				}, function (projects) {
					res.send(projects);
				});
				res.send(projects);
			});
		});
	});

};
