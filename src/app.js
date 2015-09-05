import express from 'express';
import bodyParser from 'body-parser';

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res) {
	res.send('Hello world!');
});

require('./routes/jenkins')(app);
require('./routes/api')(app);

var server = app.listen(process.env.PORT || 3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
