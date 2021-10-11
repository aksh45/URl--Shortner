const mongoose = require('mongoose');
const authschema =  mongoose.Schema({
	userid:{
		type:String,
		required:true,
	},
	name:{
		type:String,
		required:true,
		min:2,
		max:100
	},
	url:{
		type:String,
		required:true,
		min:2,
		max:100
	},
	password:{
		type:String,
		min:2,
		max:100
	},
	make_public:{
		type:Boolean
	},
	Date:{
		type:Date,
		default:Date.now
	}



});

module.exports = mongoose.model('short',authschema);
