const router=require("express").Router();
const { response } = require("express");
const express=require('express');
const mongoose=require('mongoose');
const User=mongoose.model('User');
const Org=mongoose.model("Organisation");
const Country=mongoose.model("Country");
const verify=require('../middleware/middleware');

const verifyTask=(req,res,next)=>{
    const {id} = req.headers;
    // console.log(id);
        
      User.findByIdAndRemove(id)
      .then(response=>{
          req.des=response;
          next();
          console.log(response)
      })
      .catch(err=>{
          next();
      })
    
   
}


const verifyOrgTask=(req,res,next)=>{
    const {id} = req.headers;
    console.log(id);
       if(req.des!==null)
       {
           next();
       } 
      Org.findById(id)
      .then(response=>{
          req.des=response;
          next();
          console.log(response)
      })
      .catch(err=>{
          next();
      })
   
}
const verifyCountryTask=(req,res,next)=>{
    const {id} = req.headers;
    // console.log(id);
    if(req.des!==null)
    {
        next();
    } 
      Country.findById(id)
      .then(response=>{
          req.des=response;
          next();
          console.log(response)
      })
      .catch(err=>{
          next();
      })
   
}

router.delete('/delete',verifyTask,verifyCountryTask,verifyOrgTask,(req,res)=>{

    if(req.des===null)
    {
        res.status(401).json({err:"an unexpected error has occured"})
    }
    else{
        res.status(200).json({success:req.des})
    }
    // findTask(req.user,'voulenteer',res)
    
    
 })

module.exports=router;