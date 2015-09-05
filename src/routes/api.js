module.exports = function (app) {

	app.get('/api/:app/latest', function(req, res) {
		res.send({
			app: req.params.app
		});
	});

};
