const mongoose = require('mongoose');

const niftySchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: Date,
	open:Number,
	high:Number,
	low:Number,
	close:Number,
	adj_close:Number,
	volume:Number
});

module.exports = mongoose.model('Nifty',niftySchema);