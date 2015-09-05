var jenkinsapi = require('jenkins-api');
var jenkins = jenkinsapi.init('http://192.168.99.100:8080');

module.exports = function (app) {

	app.get('/api/:app/latest', function(req, res) {
		jenkins.last_build_info(req.params.app, function(err, data) {
			if (err) {
				res.status(500);
				res.send(err);
			} else {
				var response = {
					number: data.number,
					artifact: data.url + 'artifact/' + data.artifacts[0].fileName
				};

				res.send(response);
			}
		});
	});

	app.get('/api/projects', function (req, res) {
		jenkins.all_jobs(function(err, data) {
			res.send(data);
		});
	});

};
