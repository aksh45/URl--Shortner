const express = require('express');
const router = express.Router();
const user_short = require('../models/short');
const user = require('../models/users');
const verif = require('./verifytoken');
const logdetails = require('./auth');
const jwt = require('jsonwebtoken');
router.get('/',verif,async(req,res)=>{
	try{
	const user_links = await user_short.find({userid:req.valid__user.userid});
	res.render('mylinks',{title:req.valid__user.name,links_user:user_links});
	}
	catch(err){
		res.send('something went wrong');
	}
});
module.exports = router;
