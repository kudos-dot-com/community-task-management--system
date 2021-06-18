const router=require("express").Router();
let {userlogin, countrylogin ,orgLogin}=require('../utils/LoginAuth')


router.post('/user-login',userlogin,countrylogin,orgLogin,(req,res)=>{

    res.send('email or password not found');

})

router.post('/admin-login',(req,res)=>{

    userlogin(req.body,'admin',res)

})
router.post('/org-login',userlogin,(req,res)=>{
    orgLogin(req.body,'organisation',res)
})

// --------------------------------------
router.post('/country-login',(req,res)=>{

    uservalidation(req.body,'country-ambassador',res)

})

router.post('/organisation-login',(req,res)=>{

    uservalidation(req.body,'organisation',res)

})

router.post('/campus-login',(req,res)=>{

    uservalidation(req.body,'campus-ambassador',res)

})

router.post('/voulenteer-login',(req,res)=>{

    uservalidation(req.body,'voulenteer',res)

})

module.exports=router;