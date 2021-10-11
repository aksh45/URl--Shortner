const router = require('express').Router();
const users = require('../models/users');
const OTP = require('../models/otp');
const {registartionvalidation} = require("../validation");
const {forgotvalidator} = require("../validation");
const {passwordvalidator} = require("../validation");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logcheck = require('../middleware/logincheck');
const sendotp = require('../services/otp');
const passreset = require('../services/sendpass');
const socialuser = require('../models/social');
const jwt_decode = require('jwt-decode');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('735355995248-c50cdpve5742bgohg573imstdb3pqmss.apps.googleusercontent.com');
router.get('/register',logcheck,(req,res)=>{
	res.append('Cache-Control','no-store, must-revalidate, max-age=0');
	res.render('form',{title:"Register"});
});
router.get('/forgot',logcheck,async(req,res)=>{
	res.render('newpass');
})
router.post('/forgot',async(req,res) =>{
	req.body.userid = req.body.userid.toLowerCase();
	const {error} = forgotvalidator(req.body);
	if(error){
		
		return res.json(-1);
	}
	const Userid = req.body.userid;
	const Email = req.body.email;
	try{
	const userexcist = await users.findOne({userid:Userid,email:Email,otp:true});
	if (userexcist){
		passreset({_id:userexcist._id,userid:Userid,email:Email});
		return res.json(1);
	}
		return res.json(0);
}
catch(err){
	console.log(err);
	res.json(-1);
}
});
router.get('/setpass/:token',logcheck,(req,res)=>{
	const verifytokengen = jwt.verify(req.params.token,process.env.TOK);
	if (verifytokengen){
		res.cookie('lattok',req.params.token);
		res.append('Cache-Control','no-store, must-revalidate, max-age=0');
		res.append("Pragma", "no-cache");
		res.render('setpass',{'title':'Setpass','User':verifytokengen.userid});
	}
	else{
		res.redirect('/login');
	}
});
router.post('/setpass',async(req,res)=>{
	const {error} = passwordvalidator(req.body);
		if(error){
			return res.json(0);
		}
	const tok = req.cookies.lattok;
	
	try{
		const checktok = jwt.verify(tok,process.env.TOK);
	if(checktok){
		
		const userid = checktok.userid;
		const _id = checktok._id;
		const salt = await bcrypt.genSalt(10);
		const hashpass = await bcrypt.hash(req.body.password,salt);
		await users.updateOne({'userid':checktok.userid,_id:checktok._id},{$set:{password:hashpass}});
		res.append('Cache-Control','no-store, must-revalidate, max-age=0');
		res.append("Pragma", "no-cache");
		res.json(1);
	}
	else{
		res.json(0);
	}
}
catch(err){
	res.json(-1);
	console.log(err);


}
})

router.post('/register',async(req,res)=>{
	try{
		//const {error} = user_schema.validate(req.body);
		//res.send(error.details[0].message);
		const {error} = registartionvalidation(req.body);
		const tmp_variable = req.body.userid;
		req.body.userid = tmp_variable.toLowerCase();
		if(error){
			return res.status(400).send(error.details[0].message);
		}
		const emailexcist =  await users.findOne({userid:req.body.userid});
		const users_not = await users.findOne({userid:req.body.userid,otp:false});
		if (emailexcist && users_not){
			await users.remove({userid:req.body.userid});
		}
		if(emailexcist && !(users_not)){
			return   res.json(-1);
		}
		
		const salt = await bcrypt.genSalt(10);
		const hashpass = await bcrypt.hash(req.body.password,salt);
		const new_user = new users({
			'name':req.body.name,
			'userid':req.body.userid,
			'email':req.body.email,
			'password':hashpass
		});
	
		const saved_user = await new_user.save();
		const send_data = "Created User Successfully";
		sendotp({'userid':req.body.userid,'email':req.body.email,_id:saved_user._id});
		res.json(1);
	
	}
	catch(err){
		res.json(0);
	}
  });
router.get('/verification/:encrypted',async(req,res)=>{
	try{
	
		const verified =  jwt.verify(req.params.encrypted,process.env.TOK);
		
		if(verified){
			
			await users.updateOne({'userid':verified.userid},{$set:{otp:true}});
			res.redirect('/auth/login');
		}

        }
        catch(err){
		console.log(err);
                res.status(400).redirect('/auth/login');
        }

});
//login
router.get('/login',logcheck,(req,res)=>{
	res.append('Cache-Control','no-store, must-revalidate, max-age=0');
	res.append("Pragma", "no-cache");
	res.render('login',{title:"Login"});
});
router.get('/logout',(req,res)=>{
	res.clearCookie("authtoken");
	res.redirect("/auth/login");
})
router.post('/available',async(req,res)=>{
	const tmpstorage = req.body.userid;
	req.body.userid = tmpstorage.toLowerCase();
	const excist = await users.findOne({userid:req.body.userid,otp:true})
	if(excist){
		res.send(0);
	}
	else{
		res.send(1);
	}
})
router.post('/available/email',async(req,res)=>{
	const excist = await users.findOne({email:req.body.email})
	if(excist){
                res.send(0);
        }
        else{
                res.send(1);
        }
})
router.post('/login',async(req,res)=>{
	const tmp_userid = req.body.userid;
	req.body.userid = tmp_userid.toLowerCase();
	const validuser = await users.findOne({userid:req.body.userid,otp:true});
	if(!validuser){
		return res.json(0);
	}
        const comp =  bcrypt.compareSync(req.body.password,validuser.password);
	 if(!comp){
		return res.json(0)
	 }
	const token = jwt.sign({_id:validuser._id,name:validuser.name,userid:validuser.userid},process.env.TOKEN_SECRET,{ expiresIn:'30min' });


	res.cookie('authtoken',token,{secure:false,httpOnly:true}).json(1);
});

module.exports = router; 
	
