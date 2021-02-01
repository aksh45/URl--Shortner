const joi = require('@hapi/joi');
const pattern = RegExp(/^[\w]/i);
const passwordvalidator = (data) =>{
	const user_schema = joi.object({
		password:joi.string().min(6).required()
	});
	const error = user_schema.validate(data);
	return  error;
}
const forgotvalidator = (data) =>{
	const user_schema = joi.object({
		userid:joi.string().regex(/^[a-zA-Z0-9_]{3,10}$/).required(),
		email:joi.string().min(6).required().email(),
	});
	const error = user_schema.validate(data);
	return  error;
}
const registartionvalidation = (data) =>{
	
const user_schema = joi.object({
        name:joi.string().min(2).required(),
	userid:joi.string().regex(/^[a-zA-Z0-9_]{3,10}$/).required(),
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required(),
	button:joi.string().max(8).required()

});
	const error = user_schema.validate(data);
	return  error;
}

const namevalidator = (data) =>{

const url_schema = joi.object({
	name:joi.string().regex(/^[a-zA-Z0-9_]{3,10}$/).required(),
	button:joi.string().max(5).required(),
	url:joi.string().required()
});
	const error =  url_schema.validate(data);
	return error;

}
const usernamevalidator = (data) =>{
	const usernameschema= joi.object({
		username:joi.string().regex(/^[a-zA-Z0-9_]{3,10}$/).required(),
		button:joi.string().max(5).required()
	});
	const error = usernameschema.validate(data);
	return error;
}
module.exports.registartionvalidation = registartionvalidation;
module.exports.namevalidator = namevalidator;
module.exports.usernamevalidator = usernamevalidator;
module.exports.passwordvalidator = passwordvalidator;
module.exports.forgotvalidator = forgotvalidator;

