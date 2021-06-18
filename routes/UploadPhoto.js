const multer = require("multer");
const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('User');
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

router.put("/uploadphoto", (req, res) => {
   const {link,id}=req.body;
  console.log(link);
   User.findOneAndUpdate({_id:id},{$set:{ pic: link }},
    {new:true},
   function (err, docs) {
    if (err){
        console.log(err)    
    }
    else{
        res.status(200).json({success:docs})
    console.log("Updated User : ", docs);
    }
});
})

module.exports=router;