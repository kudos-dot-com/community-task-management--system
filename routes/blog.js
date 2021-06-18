const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const {verify}=require('../middleware/middleware'); //used to verify that token is provided or not
const Blog=mongoose.model("Blog");
const BlogEnrollment=mongoose.model("BlogEnrollment");
// const { Blog } = require("../models/Blog");

// const { auth } = require("../middleware/auth");
const multer = require("multer");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");

//=================================
//             Blog
//=================================

// fieldname: 'file',
// originalname: 'React.png',
// encoding: '7bit',
// mimetype: 'image/png',
// destination: 'uploads/',
// filename: '1573656172282_React.png',
// path: 'uploads/1573656172282_React.png',
// size: 24031 

router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post("/createPost", (req, res) => {
    let blog = new Blog({ title:req.body.title, description:req.body.description ,content: req.body.content, writer: req.body.userID });
    console.log(req.body);
    blog.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo })
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