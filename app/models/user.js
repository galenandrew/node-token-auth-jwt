// init instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define mongoose model and output it as the exports
module.exports = mongoose.model('User', new Schema({
	name: String,
	password: String,
	admin: Boolean
}));