const express=require("express");
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");
const Organisation=mongoose.model("Organisation");
const Country=mongoose.model("Country");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config');

const verify=(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization)
    {
        return res.json({err:'you must be logged in'});
    }
    const token=authorization.replace('Bearer ',"")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return res.json({err:'you must be logged in'});
        }
        const {_id}=payload;
        User.findById(_id)
        .then(userdata=>{
            req.user=userdata;
            next();
        })
    })
   
}


const verifyOrg=(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization)
    {
        return res.json({err:'you must be logged in'});
    }
    const token=authorization.replace('Bearer ',"")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return res.json({err:'you must be logged in'});
        }
        const {_id}=payload;
        Organisation.findById(_id)
        .then(userdata=>{
            req.user=userdata;
            next();
        })
    })
   
}
const verifyCountry=(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization)
    {
        return res.json({err:'you must be logged in'});
    }
    const token=authorization.replace('Bearer ',"")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err)
        {
            return res.json({err:'you must be logged in'});
        }
        const {_id}=payload;
        Country.findById(_id)
        .then(userdata=>{
            req.user=userdata;
            next();
        })
    })
   
}
module.exports={
    verify,
    verifyOrg,
    verifyCountry
}