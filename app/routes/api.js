var express = require('express');
var config = require('../../config.json');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

// Route All The Things!!!
var apiRoutes = express.Router();

// Authentication route (validates a user, generates a token)
apiRoutes.post('/auth', function(req, res) {
	// find the user
	User.findOne({ name: req.body.username }, function(err, user) {
		if(err) throw err;

		if(!user) {
			res.json({
				success: false,
				message: 'Authentication failed. User not found.'
			});
		} else if(user) {
			if(user.password != req.body.password) {
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password.'
				});
			} else {
				// create a token
				var token = jwt.sign(user, config.tokenSecret, {
					expiresInMinutes: 1 // eg 24 hours
				})

				// return the info
				res.json({
					success: false,
					message: 'Authentication failed. Wrong password.',
					token: token
				});
			}
		}
	});
});

// TODO: route middleware to verify a token
apiRoutes.use(function(req, res, next) {
	// get the token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	// decode the token
	if(token) {
		jwt.verify(token, config.tokenSecret, function(err, decoded) {
			if(err) {
				res.json({
					success: false,
					message: 'BAD TOKEN!'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.json({
			success: false,
			message: 'NO TOKEN!!'
		});
	}
});

// base route
apiRoutes.get('/', function(req, res){
	res.json({'message':'Welcome to the API! Check it out, but know there are places only some can go…'});
});

// get all users
apiRoutes.get('/users', function(req, res) {
	User.find({}, function(err, users) {
		res.json(users);
	});
});


module.exports = apiRoutes;