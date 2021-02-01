const jwt = require('jsonwebtoken');
module.exports = function (req,res,next){
	const token =  req.cookies.authtoken;
	if (!token){
		return res.redirect('/auth/login');
	}
	try{
 		const verified =  jwt.verify(token,process.env.TOKEN_SECRET);
		 req.valid__user = verified;
		next();
	}
	catch(err){
		res.clearCookie("authtoken");
		res.status(400).redirect('auth/login');
	}
};

