const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');
const {verify}=require('../middleware/middleware'); //used to verify that token is provided or not
const Blog=mongoose.model("Blog");
const BlogEnrollment=mongoose.model("BlogEnrollment");
const Users=mongoose.model("User");
const Organisation=mongoose.model("Organisation");
const Task=mongoose.model("Task");
const OrgTask=mongoose.model("OrgTask");
const CountryTask=mongoose.model("CountryTask");
const Country=mongoose.model("Country");
// for admin
router.get("/getTotalBlogs",verify,(req, res) => {
    // const {postId}=req.body;
    console.log(req.user._id)
    Blog.countDocuments({'writer':req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});

router.get("/getTotalCampus",verify,(req, res) => {
    // const {postId}=req.body;
    console.log(req.user._id)
    Users.countDocuments({role:"campus-ambassador",'addedByAdmin':req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});

router.get("/getTotalVolunteer",verify,(req, res) => {
    // const {postId}=req.body;
    console.log(req.user._id)
    Users.countDocuments({role:"voulenteer",'addedByAdmin':req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/getTotalCountry",verify,(req, res) => {
    // const {postId}=req.body;
    console.log(req.user._id)
    Country.countDocuments({role:"country-ambassador",'addedByAdmin':req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
// featyree
router.get("/getTotalOrganisation",verify,(req, res) => {
    // const {postId}=req.body;
    console.log(req.user._id)
    Organisation.countDocuments()
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});

router.get("/getTotalTasks",verify,(req, res) => {
    // const {postId}=req.body;
    console.log(req.user._id)
    Task.countDocuments({'role':'admin'})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});

router.get("/getTotalTasksSum",verify,(req, res) => {
    // const {postId}=req.body;
    console.log(req.user._id)
   Task.aggregate([
    // { $match: { role:"admin"}},
    { $group: { _id: null, amount: { $sum: "$PointsGained" } } }])
    .then(response=>{
        console.log(response)
    })
    .catch(err=>{
        console.log(err)
    })
});

router.get("/getTotalTasksApproved",verify,(req, res) => {
    // const {postId}=req.body;
    console.log(req.user._id)
    Task.countDocuments({admin:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
// campus and volunteer

router.get("/campus-ambassador-getTotalTasksApproved-admin",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    Task.countDocuments({user:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/campus-ambassador-getTotalTasksApproved-organisation",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/campus-ambassador-getTotalTasksApproved-country",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
// pending approval
router.get("/campus-ambassador-getTotalTasksNotApproved-admin",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    Task.countDocuments({user:req.user._id,status:"not approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/campus-ambassador-getTotalTasksNotApproved-organisation",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id,status:"not approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/campus-ambassador-getTotalTasksNotApproved-country",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id,status:"not approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});

// total tasks enrolled
// pending approval
router.get("/campus-ambassador-getTotalTasksEnrolled-admin",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    Task.countDocuments({user:req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/campus-ambassador-getTotalTasksEnrolled-organisation",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/campus-ambassador-getTotalTasksEnrolled-country",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});

router.get("/campus-ambassador-getTotalTasksApproved-admin",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    Task.countDocuments({user:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/campus-ambassador-getTotalTasksApproved-organisation",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/campus-ambassador-getTotalTasksApproved-country",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});

// voulenteer
router.get("/voulenteer-getTotalTasksApproved-organisation",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/voulenteer-getTotalTasksApproved-admin",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    Task.countDocuments({user:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/voulenteer-getTotalTasksApproved-country",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    CountryTask.countDocuments({user:req.user._id,status:"approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
// pendng approval
router.get("/voulenteer-getTotalTasksNotApproved-admin",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    Task.countDocuments({user:req.user._id,status:"not approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/voulenteer-getTotalTasksNotApproved-organisation",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id,status:"not approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/voulenteer-getTotalTasksNotApproved-country",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id,status:"not approved"})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});

// enrolled tasks
router.get("/voulenteer-getTotalTasksEnrolled-admin",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    Task.countDocuments({user:req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/voulenteer-getTotalTasksEnrolled-organisation",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
router.get("/voulenteer-getTotalTasksEnrolled-country",verify,(req, res) => {
    // const {postId}=req.body;
    // console.log(req.user._id)
    OrgTask.countDocuments({user:req.user._id})
    .then(response=>{
        // console.log(res);
        res.status(200).json({success:response})
    })
    .catch(err=>{
        console.log(err)
        res.status(401).json({err:err})
    })
});
module.exports = router;