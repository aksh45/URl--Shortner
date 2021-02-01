const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
	const token =  req.cookies.authtoken;
	if (!token){
		return next();
	}
	try{
 		const verified =  jwt.verify(token,process.env.TOKEN_SECRET);
		 req.valid__user = verified;
		 return res.redirect('/');
	}
	catch(err){
		return next();
	}
};

