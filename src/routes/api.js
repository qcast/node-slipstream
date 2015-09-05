var request = require('superagent');

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

	app.get('/api/projects', function(req, res) {
		jenkins.all_jobs(function(err, data) {
			res.send(data);
		});
	});

};
