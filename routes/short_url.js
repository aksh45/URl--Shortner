const express = require('express');
const router = express.Router();
const short_url = require('../models/short');
const user = require('../models/users');
const verif = require('../middleware/verifytoken');
const logdetails = require('./auth');
const jwt = require('jsonwebtoken');
const {namevalidator} = require("../validation");

router.post('/',verif,async(req,res) =>{
	try{
		req.body.name = (req.body.name).toLowerCase();
		const {error} = namevalidator(req.body);
		if(error){
			return res.status(400).send(error.details[0].message);
		}
		if (await short_url.findOne({userid:req.valid__user.userid,name:req.body.name})){
			return res.json({"message":"failed"});
		}
		const pos = new short_url({
			"userid":req.valid__user.userid,
			"name":req.body.name,
			"url":req.body.url,
			"password":req.body.password || '',
			"make_public": req.body.make_public
			}
		);
		pos.save()
		.then(data =>{
			res.json({"message":"success"});
		});
	}
	catch(err){
		res.json({"message":'Something went wrong'});
	}
});

//get specific user urls
// router.get('/:myshort_url', verif,async(req,res) =>{
// 	var tmpmemory = req.params.myshort_url;
// 	req.params.myshort_url = tmpmemory.toLowerCase();
//         try{	
// 		const pos = await short_url.find({userid:req.params.myshort_url}).select({'name':1,'url':1,_id:0});
// 		if(!(await user.findOne({userid:req.params.myshort_url}))){
// 			return res.send('User Does Not excist');
// 		}
// 		res.json(pos);
//         }
//         catch (err) {
//                 res.send("Not there");
//         }
// });

router.get('/shorturls/:user_id',async(req,res)=>{
	req.params.user_id = req.params.user_id.toLowerCase();
	try{
		const user_exist = await user.findOne({userid:req.params.user_id});
		if(user_exist){
			const all_urls = await short_url.find({userid:req.params.user_id,make_public: true}).select({'name':1,_id:0});
			return res.json({urls:all_urls});
		}
		return res.json({message:'Invalid User'});
	}
	catch(err){
		return res.json({message:'Something went wrong'});
	}
})
router.get('/',verif,async(req,res)=>{
	var limit = 10;
	if(typeof parseInt(req.query.page) != "number" || parseInt(req.query.page)<1){
		req.query.page = 1;
	}
	var page = req.query.page || 1;
	var skip = (page-1)*limit;
	const count =  await short_url.find({userid:req.valid__user.userid}, { name : 1, url : 1 }).countDocuments();
	const urls = await short_url.find({userid:req.valid__user.userid}, { name : 1, url : 1 }).sort({ _id: -1 }).skip(skip).limit(limit);
	res.append('Cache-Control','no-store, must-revalidate, max-age=0');
	res.render('shortenurl',{title:"Create Short Url",shorturls:urls,myuserid:req.valid__user.userid,count:count});
})

//redirect to specific url

router.post('/:user_id/:short_name',async(req,res)=>{
	try{
		req.params.user_id = (req.params.user_id).toLowerCase();
		req.params.short_name = (req.params.short_name).toLowerCase();
		const pos = await short_url.findOne({userid:req.params.user_id,name:req.params.short_name,password:req.body.password});
		if(pos){
			return res.redirect(pos.url);
		}
		else{
			return res.send('wrong password');
		}
	}
	catch(err){
		res.json({message:err});
	}
		
});
router.get('/:user_id/:short_name',async(req,res)=>{
	var url_exist = await short_url.findOne({userid:req.params.user_id,name:req.params.short_name});
	if(!url_exist)
		return res.json({message:'No such url'});
	if(url_exist.password == ''){
		return res.redirect(url_exist.url);
	}
	return res.render('s_url_password',{title:'Enter password'});
})

//delete Specific short url

router.delete('/:username/:short_name',verif,async(req,res)=>{
	const udetails = req.valid__user;
	try{
		const uid = req.params.username;
		const pdetails = await short_url.findOne({userid:uid,name:req.params.short_name});
		if(pdetails.userid != udetails.userid){return res.status(400).send("Prohbitted");}
		const rpos = await short_url.remove({_id:pdetails._id});
		res.json(pdetails);
	}
	catch(err){
		res.json({'message':err});
	}
});





module.exports = router;
