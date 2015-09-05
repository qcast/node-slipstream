module.exports = function(app) {

		app.post('/build-complete', function(req, res) {
			res.send('OK!!!!');
		});
};
