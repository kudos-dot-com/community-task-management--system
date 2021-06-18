const express=require("express");
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");
const Organisation=mongoose.model("Organisation");
const Country=mongoose.model("Country");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config');
const verify=require('../middleware/middleware');


const userlogin=(req,res,next)=>{
const {email,password} = req.body;
// console.log(req)
if(!email || !password)
{   
    console.log("incomplete fields");
    return res.status(422).json({err:"incomplete fields"});
}
User.findOne({email:email})
.then(getuser=>{

    if(!getuser)
    {  
       return next();
    }
    bcrypt.compare(password,getuser.password)
    .then(status=>{
       
        if(status)
        {
            const token=jwt.sign({_id:getuser._id},JWT_SECRET,{ expiresIn: '1h' })
           res.json({token:token,user:getuser});
        }
        else{
            return res.status(422).json({err:"password wrong"});
        }
    })
    .catch(err=>{
        res.json({err:err})
    })
   
})
.catch(err=>{
    res.json({err:err})
})
}

//country

const countrylogin=(req,res,next)=>{
    const {email,password} = req.body;
    // console.log(req)
    if(!email || !password)
    {   
        console.log("incomplete fields");
        return res.status(422).json({err:"incomplete fields"});
    }
    Country.findOne({email:email})
    .then(getuser=>{
    
        if(!getuser)
        {  
           return next();
        }
        bcrypt.compare(password,getuser.password)
        .then(status=>{
           
            if(status)
            {
                const token=jwt.sign({_id:getuser._id},JWT_SECRET,{ expiresIn: '1h' })
               res.json({token:token,user:getuser});
            }
            else{
                return res.status(422).json({err:"password wrong"});
            }
        })
        .catch(err=>{
            res.json({err:err})
        })
       
    })
    .catch(err=>{
        res.json({err:err})
    })
    }
const orgLogin=(req,res,next)=>{
    const {email,password} = req.body;
    Organisation.findOne({email:email})
    .then(getuser=>{
    
        if(!getuser)
        {   
           return next();
        }
        bcrypt.compare(password,getuser.password)
        .then(status=>{
           
            if(status)
            {
                const token=jwt.sign({_id:getuser._id},JWT_SECRET,{ expiresIn: '1h' })
               res.json({token:token,user:getuser});
            }
            else{
                return res.status(422).json({err:"password wrong"});
            }
        })
        .catch(err=>{
            res.json({err:err})
        })
       
    })
    .catch(err=>{
        res.json({err:err})
    })
}
module.exports={
    userlogin,
    countrylogin,
    orgLogin
};