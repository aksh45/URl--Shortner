const OTP = require('../models/otp');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var otp_n;
var Data;
const otpgenerator = async(data) =>{
	 Data = data;
	 otp_n = Math.floor((Math.random()+1)*1000+Math.random()*100+Math.random()*10+Math.random());
	console.log(data._id);
	console.log(otp_n);
	const token = jwt.sign({_id:data._id,userid:data.userid,otp:otp_n},process.env.TOK,{ expiresIn:'10min' });
	 try{
		var transporter = nodemailer.createTransport({
 			 service: 'gmail',
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
  			auth: {
    				user: 'aksh.aksh0929@gmail.com',
    				pass: process.env.PASS
  			}
		});
		var mailOptions = {
  			from: 'aksh.aksh0929@gmail.com<Akshit Ahuja>',
  			to: data.email,
  			subject: 'Social Brother Account Verification',
  			text: " Hi "+ data.userid+"\n Someone Maybe You have requested a password reset. Here below is the link to reset your pass\n"+`${process.env.BASE_URL}/auth/setpass/`+token
		};
		transporter.sendMail(mailOptions, function(error, info){
  			if (error) {
   				 return error;
  			} 
			else {
				console.log(info.response);
    				return 'Email sent: ' + info.response;
  			}
		});
	}
	catch(err){
		return err;	
	}
}
module.exports = otpgenerator;
