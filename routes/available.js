const router = require('express').Router();
const users = require('../models/users');

router.post('/',async(req,res)=>{
	const excist = await users.findOne({userid:req.body.userid,otp:true})
	if(excist){
		res.send("Username is not available");
	}
	else{
		res.send("Username is available");
	}
})
router.post('/available/email',async(req,res)=>{
	const excist = await users.findOne({email:req.body.email})
	if(excist){
                res.send("0");
        }
        else{
                res.send("1");
        }
})

module.exports = router; 
	
