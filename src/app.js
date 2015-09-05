import express from 'express';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';

var app = express();
app.use(expressLayouts);
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

require('./routes/jenkins')(app);
require('./routes/api')(app);
require('./routes/ui')(app);

var server = app.listen(process.env.PORT || 3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
