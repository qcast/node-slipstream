var request = require('superagent');

var jenkins = require('../jenkins');

module.exports = function (app) {

	app.get('/api/:app/latest/artifact', function(req, res) {
		jenkins.last_build_info(req.params.app, function(err, data) {
			if (err) {
				res.status(500);
				res.send(err);
			} else {
				var artifactUrl = data.url + 'artifact/' + data.artifacts[0].relativePath;
				request.get(artifactUrl).pipe(res);
			}
		});
	});

	app.get('/api/projects', function (req, res) {
		jenkins.all_jobs(function(err, data) {
			res.send(data);
		});
	});

};
