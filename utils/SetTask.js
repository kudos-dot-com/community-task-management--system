const express=require('express');
const mongoose=require('mongoose');
const Task=mongoose.model('Task');
const verify=require('../middleware/middleware');

const addTask=(req,role,res,userdets)=>{

console.log(role);
    if(role==='admin')
    {
        const {taskmedia,title,description,points,assigned}=req.body;

        if(!title || !description || !points)
        {
            return res.json({success:"please fill all the fields"})
        }        
            
          const task=new Task({
            title,
            description,
            points,
            assigned,
            taskmedia,
            role
        });
        
        task.save()
        .then(response=>{
            res.status('200').json({success:"your task has been posted",task:response})
        })
        .catch(err=>{
            res.status("422").json({err:err})
        })
    }
    else
   if(role==='campus-ambassador' || role==='voulenteer')
    {
        const {title,description,points,media}=req.body;

        if(!title || !description || !points || !media)
        {
            return res.json({success:"please fill all the fields"})
        }
   
        task=new Task({
            title,
            description,
            points,
            media,
            role,
            user:userdets,
            admin:userdets.addedByAdmin._id
        });
        
        task.save()
        .then(response=>{
            res.status('200').json({success:"your task has been posted",task:response})
        })
        .catch(err=>{
            res.status("422").json({err:err})
        })
    }else{
        const {title,description,points,media}=req.body;

        if(!title || !description || !points || !media)
        {
            return res.json({success:"please fill all the fields"})
        }
   
        task=new Task({
            title,
            description,
            points,
            media,
            role,
            country:userdets,
            admin:userdets.addedByAdmin._id
        });
        
        task.save()
        .then(response=>{
            res.status('200').json({success:"your task has been posted",task:response})
        })
        .catch(err=>{
            res.status("422").json({err:err})
        })
    }
   

   
}


// get the tasks

const fetchTask=(role,assigned,userdets,res)=>{
    if(assigned==="" && role!=='admin'){
    Task.find({role:role,admin:userdets._id})
    .sort({createdAt:-1 })
    .populate("user country")
    .then(response=>{
        res.json({success:response})
    })
    .catch(err=>{
        res.json({err:err})
    })}
    else if(role==='admin' && assigned==="")
    {
        Task.find({role:role})
        .sort({createdAt:-1 })
        .populate("user country")
        .then(response=>{
            res.json({success:response})
        })
        .catch(err=>{
            res.json({err:err})
        })  
    }else
    {
        Task.find({assigned:assigned})
        .sort({createdAt:-1 })
        .populate("user country")
        .then(response=>{
            res.json({success:response})
        })
        .catch(err=>{
            res.json({err:err})
        })  
    }
}

const findTask=(user,role,res)=>{
    if(role==="country-ambassador")
    {
    Task.find({country:user._id})
    .sort({createdAt:-1 })
    .populate("country")
    .then(response=>{
        res.json({success:response})
    })
    .catch(err=>{
        res.json({err:err})
    })    
    }
    else{
    Task.find({user:user._id})
    .sort({createdAt:-1 })
    .populate("user")
    .then(response=>{
        res.json({success:response})
    })
    .catch(err=>{
        res.json({err:err})
    })
    }
    
}

const updateTask=(req,role,res)=>{
    
    const {_id,points}= req.body;
    Task.findByIdAndUpdate(_id,{"status":"approved","PointsGained":points})
        .then((data)=>{
        res.json({success:data})
        })
        .catch(err=>{
        res.json({err:err})     
        })
    .catch(err=>{
        res.json({err:err})
    })
}

module.exports={
    addTask,
    fetchTask,
    findTask,
    updateTask
}