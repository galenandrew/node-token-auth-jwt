// require necessary modules
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config.json');
var User = require('./app/models/user');
var apiRoutes = require('./app/routes/api');

// define the app
var app = express();
var port = process.env.PORT || 8080;
mongoose.connect(config.database);

// parse the stuff
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// set up logging
app.use(morgan('dev'));

// base route
app.get('/', function(req, res){
	res.send('Welcome to the API Server!');
});

// set up a user
app.get('/setup', function(req, res){
	// define user
	var andrew = new User({
		name: 'Andrew Turner',
		password: 'password',
		admin: true
	});

	// save user
	andrew.save(function(err) {
		if(err) throw err;

		console.log('User saved successfully');
		res.json({ success: true });
	});
});

// add the API routes
app.use('/api', apiRoutes);

// Start the Server
app.listen(port, function(){
	console.log(
		"--------------------------------------\n",
		'API Server started and listening on http://localhost:' + port
	);
});