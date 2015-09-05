var request = require('superagent');

var jenkins = require('../jenkins');

var PARSE_APP_ID = require('../keys').PARSE_APP_ID;
var PARSE_API_KEY = require('../keys').PARSE_API_KEY;

module.exports = function(app) {

	app.post('/build-complete/:app', function(req, res) {
		var app = req.params.app;
		jenkins.last_build_info(app, function(err, data) {
			if (err) {
				res.status(500);
				res.send(err);
				console.log(err);
			} else {
				var artifactUrl = req.protocol + '://' + req.get('Host') + '/api/' + app + '/latest/artifact';
				console.log(artifactUrl);
				request.post('https://api.parse.com/1/push')
					.set('X-Parse-Application-Id', PARSE_APP_ID)
					.set('X-Parse-REST-API-Key', PARSE_API_KEY)
					.send({
						channels: [req.params.app],
						data: {
							alert: 'New Build Ready',
							artifact: artifactUrl,
							'content-available': 1
						}
					}).end(function(err, res) {
						if (res.ok) {
							console.log('yay got ' + JSON.stringify(res.body));
						} else {
							console.log('Oh no! error ' + res.text);
						}
					});
				res.send('OK!!!!');
			}
		});

	});
};
