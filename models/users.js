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
		required:true,
		min:2,
		max:100
	},
	email:{
		type:String,
		required:true,
		min:2,
		max:100
	},
	password:{
		type:String,
		required:true,
		min:2,
		max:100
	},
	otp:{
		type:String,
		required:true,
		default:false
	},
	Date:{
		type:Date,
		default:Date.now
	}



});

module.exports = mongoose.model('users',authschema);
