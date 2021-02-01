const mongoose = require('mongoose');
const authschema =  mongoose.Schema({
	userid:{
		type:String,
		required:true,
		min:2,
		max:100
	},
	otp:{
		type:String,
		required:true,
		min:4,
		max:4
	},
	Date:{
		type:Date,
		default:Date.now
	}



});

module.exports = mongoose.model('otp',authschema);
