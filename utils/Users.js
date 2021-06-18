const express=require('express');
const mongoose=require('mongoose');
const Task=mongoose.model('Task');
const User=mongoose.model("User");
const Organisation=mongoose.model("Organisation");
const Country=mongoose.model('Country');
const verify=require('../middleware/middleware');

const finduser=(role,user,res,current)=>{
   if(current==="admin")
   {
    if(role==="country-ambassador")
    {
    Country.find({addedByAdmin:user._id,role:role})
    .sort({createdAt:-1 })
    .then(data=>{
        res.status(200).json({success:data})
    })
    .catch(err=>{
        res.status(403).json({err:err})
    }) 
    }   
    else{
    User.find({addedByAdmin:user._id,role:role})
    .sort({createdAt:-1 })
    .then(data=>{
        res.status(200).json({success:data})
    })
    .catch(err=>{
        res.status(403).json({err:err})
    }) 
   }}
   else if(current==="organisation")
   {
    if(role==="country-ambassador")
    {
    Country.find({addedByOrg:user._id,role:role})
    //  .populate("addedByOrg")
    .sort({createdAt:-1 })
    .then(data=>{
        res.status(200).json({success:data})
    })
    .catch(err=>{
        res.status(403).json({err:err})
    }) 
    }else{
    User.find({addedByOrg:user._id,role:role})
    //  .populate("addedByOrg")
    .sort({createdAt:-1 })
    .then(data=>{
        res.status(200).json({success:data})
    })
    .catch(err=>{
        res.status(403).json({err:err})
    }) 
    }
   }
   else if(current==="country-ambassador")
   {
    // if(role==="country-ambassador")
    {
    User.find({addedByCountry:user._id,role:role})
    //  .populate("addedByOrg")
    .sort({createdAt:-1 })
    .then(data=>{
        res.status(200).json({success:data})
    })
    .catch(err=>{
        res.status(403).json({err:err})
    }) 
    }}
   
}

const findorganisation=(role,res)=>{
    Organisation.find({role:role})
    .sort({createdAt:-1 })
    .then(data=>{
        res.status(200).json({success:data})
    })
    .catch(err=>{
        res.status(403).json({err:err})
    })    
}

module.exports={
    finduser,
    findorganisation
}
