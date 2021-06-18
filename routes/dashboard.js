const router=require("express").Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");
const Organisation=mongoose.model("Organisation");
const {finduser,findorganisation}=require("../utils/Users")
const {verify,verifyOrg,verifyCountry}=require('../middleware/middleware');


router.get('/dashboard',verify,(req,res)=>{
    res.json({user:req.user});
})
// admin
router.get('/get-campus-user',verify,(req,res)=>{
  
    finduser('campus-ambassador',req.user,res,'admin');
})
router.get('/get-voulenteers-user',verify,(req,res)=>{
  
    finduser('voulenteer',req.user,res,'admin');
})
router.get('/get-organisation',(req,res)=>{
  
    findorganisation('organisation',res);
})
router.get('/get-country-user',verify,(req,res)=>{
  
    finduser('country-ambassador',req.user,res,'admin');
})

// organisation
router.get('/org-get-campus-user',verifyOrg,(req,res)=>{
  
    finduser('campus-ambassador',req.user,res,'organisation');
})
router.get('/org-get-country-user',verifyOrg,(req,res)=>{
  
    finduser('country-ambassador',req.user,res,'organisation');
})
router.get('/org-get-voulenteers-user',verifyOrg,(req,res)=>{
  
    finduser('voulenteer',req.user,res,'organisation');
})

// country

router.get('/country-get-campus-user',verifyCountry,(req,res)=>{
  
    finduser('campus-ambassador',req.user,res,'country-ambassador');
})
router.get('/country-get-country-user',verifyCountry,(req,res)=>{
  
    finduser('country-ambassador',req.user,res,'country-ambassador');
})
router.get('/country-get-voulenteers-user',verifyCountry,(req,res)=>{
  
    finduser('voulenteer',req.user,res,'country-ambassador');
})
module.exports=router;