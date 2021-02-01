const mongoose = require('mongoose');
const authschema =  mongoose.Schema({
	name:{
		type:String,
		required:true,
		min:2,
		max:100
	},
	userid:{
		type:String,
		min:2,
		max:100
	},
	email:{
		type:String,
		required:true,
		min:2,
		max:100
	},
	Date:{
		type:Date,
		default:Date.now
	}



});

module.exports = mongoose.model('social',authschema);
