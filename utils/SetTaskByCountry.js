// organisation task
const express=require('express');
const mongoose=require('mongoose');
const CountryTask=mongoose.model('CountryTask');
const verify=require('../middleware/middleware');

const addTask=(req,role,res,userdets)=>{

console.log(role);
    if(role==='country-ambassador')
    {
        const {taskmedia,title,description,points,assigned}=req.body;

        if(!title || !description || !points)
        {
            return res.json({success:"please fill all the fields"})
        }        
            
          const task=new CountryTask({
            title,
            description,
            points,
            country:userdets,
            role,
            taskmedia,
            assigned:assigned
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
        const {title,description,points,media,addedBy}=req.body;

        if(!title || !description || !points || !media)
        {
            return res.json({success:"please fill all the fields"})
        }
   
        task=new CountryTask({
            title,
            description,
            points,
            media,
            role,
            user:userdets,
            task_id:userdets.addedByCountry
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

const fetchTask=(req,role,assigned,res,user)=>{
  
    console.log(user);
    if(role==='country-ambassador'){
    CountryTask.find({country:user.addedByCountry,assigned:assigned})
    .sort({createdAt:-1 })
    // .populate("user")
    .then(response=>{
        res.json({success:response})
    })
    .catch(err=>{
        res.json({err:err})
    })
    }
    else 
    // if(role==='campus-ambassador')
    {
        CountryTask.find({task_id:user._id,role:role})
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

const OrgFetchTask=(req,res,user)=>{
    //   const {addedBy}=req.body;
        OrgTask.find({task_id:user._id})
        .sort({createdAt:-1 })
        // .populate("user")
        .then(response=>{
            res.json({success:response})
        })
        .catch(err=>{
            res.json({err:err})
        })  
}

const findTask=(user,role,res)=>{
    if(role==='country-ambassador')
    {
    CountryTask.find({country:user._id})
    .sort({createdAt:-1 })
    // .populate("user")
    .then(response=>{
        res.json({success:response})
    })
    .catch(err=>{
        res.json({err:err})
    })
}
else{
    CountryTask.find({user:user._id})
    .sort({createdAt:-1 })
    // .populate("user")
    .then(response=>{
        res.json({success:response})
    })
    .catch(err=>{
        res.json({err:err})
    })
}
}
//
const updateTask=(req,role,res)=>{
    
    const {_id,points}= req.body;
    CountryTask.findByIdAndUpdate(_id,{"status":"approved","PointsGained":points})
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
    updateTask,
    OrgFetchTask   
}