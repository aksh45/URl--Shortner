const express = require('express');
const router = express.Router();
const posts = require('../models/short');
const user = require('../models/users');
const verif = require('./verifytoken');
const logdetails = require('./auth');
const jwt = require('jsonwebtoken');
const {namevalidator} = require("../validation");

router.post('/',verif,async(req,res) =>{
	var mystore = req.body.name;
	req.body.name = mystore.toLowerCase();
	 const {error} = namevalidator(req.body);
        if(error){
                return res.status(400).send(error.details[0].message);
        }

	if (await posts.findOne({userid:req.valid__user.userid,name:req.body.name})){
		return res.json({"message":"failed"});
	}
	const pos = new posts(
		{"userid":req.valid__user.userid,
		 "name":req.body.name,
		 "url":req.body.url
		}
	);
	try{
	pos.save()
	.then(data =>{
		res.json({"message":"success"});
	});
	}
	catch(err){
		res.json({"message":err});
	}
});

//get specific user urls
router.get('/:myposts', verif,async(req,res) =>{
	var tmpmemory = req.params.myposts;
	req.params.myposts = tmpmemory.toLowerCase();
        try{	
		if(req.params.myposts != req.valid__user){
			return res.send('user Profile feature coming soon');
		}
                const pos = await posts.find({userid:req.params.myposts});
		 if(!(await user.findOne({userid:req.params.myposts}))){
			return res.send('User Does Not excist');
		}
		res.json(pos);
        }
        catch (err) {
                res.send("Not there");
        }
});

router.get('/',verif,async(req,res)=>{
	const urls = await posts.find({userid:req.valid__user.userid}, { name : 1, url : 1 });
	res.append('Cache-Control','no-store, must-revalidate, max-age=0');
	res.render('shortenurl',{title:"Create Short Url",shorturls:urls,myuserid:req.valid__user.userid});
})

//Specific Post 

router.get('/:postid/:platform',async(req,res)=>{
	try{
		var tmpstore = req.params.postid;
		req.params.postid = tmpstore.toLowerCase();
		var tmpstore2 = req.params.platform;
		req.params.platform = tmpstore2.toLowerCase();
		const pos = await posts.findOne({userid:req.params.postid,name:req.params.platform});
		if(pos){
			return res.redirect(pos.url);
		}
		else{
			return res.send('oops page doesnot excist');
		}
	}
	catch(err){
		res.json({message:err});
	}
		
});

//delete Specific short url

router.delete('/:username/:platform',verif,async(req,res)=>{
	const udetails = req.valid__user;
	try{
		const uid = req.params.username;
		const pdetails = await posts.findOne({userid:uid,name:req.params.platform});
		if(pdetails.userid != udetails.userid){return res.status(400).send("Prohbitted");}
		const rpos = await posts.remove({_id:pdetails._id});
		res.json(pdetails);

	}
	catch(err){
		res.json({'message':err});
	}
});





module.exports = router;
