const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const {verify}=require('../middleware/middleware'); //used to verify that token is provided or not
const User=mongoose.model("User");
const Organisation=mongoose.model("Organisation");
const Country=mongoose.model("Country");
router.post("/campus-ambassador/profile", (req, res) => {
    User.findById(req.body.id)
    .then(response=>{
        res.status(200).json({success:response})
    })
    .catch(err=>{
        res.status(401).json({err:err})
    })
});

router.post("/country-ambassador/profile", (req, res) => {
    Country.findById(req.body.id)
    .then(response=>{
        res.status(200).json({success:response})
    })
    .catch(err=>{
        res.status(401).json({err:err})
    })
});

router.post("/voulenteer/profile", (req, res) => {
    User.findById(req.body.id)
    .then(response=>{
        res.status(200).json({success:response})
    })
    .catch(err=>{
        res.status(401).json({err:err})
    })
});


router.post("/organisation/profile", (req, res) => {
    Organisation.findById(req.body.id)
    .then(response=>{
        res.status(200).json({success:response})
    })
    .catch(err=>{
        res.status(401).json({err:err})
    })
});

router.get("/getBlogs", (req, res) => {
    Blog.find()
        .populate("writer")
        .sort({updatedAt:-1})
        .exec((err, blogs) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, blogs });
        });
});

router.post("/getPost", (req, res) => {
    console.log(req.body)
    Blog.findOne({ "_id": req.body.postId })
        .populate('writer enrolled.user')
        .exec((err, post) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, post })
        })
});

router.post("/enroll",verify,(req,res)=>{
    console.log(req.body.postId);
    const blog=new BlogEnrollment({
       blog:req.body.postId,
       user:req.user
    });
    
    blog.save()
    .then(response=>{
        res.status('200').json({success:"your task has been posted",task:response})
    })
    .catch(err=>{
        res.status("422").json({err:err})
    })
})


router.put("/submitAction",verify,(req,res)=>{
    console.log(req.body.link);
    Blog.findByIdAndUpdate(req.body.postId,{
        $addToSet:{submission:{user:req.user._id,link:req.body.link,status:'submitted'}}
    },
    {
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
        console.log(result);
        return res.status(200).json({success:result})
    }})
})
// 
router.put("/ApproveAction",verify,(req,res)=>{
    const {postId}=req.body;
    BlogEnrollment.findByIdAndUpdate(req.body.postId,{ status:"approved"})
    .then(response=>{
        res.status(200).json({success:response})
    })
    .catch(err=>{
        res.status(422).json({success:response})
    })
})
// get all enrolled

router.get("/getEnrolled",verify,(req,res)=>{
    BlogEnrollment.find()
    .sort({updatedAt:-1})
    .populate('blog user')
    .then(response=>{
        res.status(200).json({success:response})
    })
    .catch(err=>{
        res.status(422).json({success:response})
    })
})

router.get("/getMyEnrolledActions",verify,(req,res)=>{
    Blog.find({'enrolled.user':req.user._id})
    // .sort({createdAt:-1})
    // .populate('enrolled')
    .then(response=>{
        res.status(200).json({blogs:response})
    })
    .catch(err=>{
        res.status(422).json({success:response})
    })
})

router.get("/getMyApprovedActions",verify,(req,res)=>{
    Blog.find({'enrolled.user':req.user._id,'enrolled.status':'enrolled'})
    // .sort({createdAt:-1})
    // .populate('enrolled')
    .then(response=>{
        if(response)
        {
            res.status(200).json({blogs:response})
        }
        else
        {
            res.status(200).json({blogs:[]})
        }
    })
    .catch(err=>{
        res.status(422).json({success:response})
    })
})



module.exports = router;
