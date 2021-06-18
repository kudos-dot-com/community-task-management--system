const router=require("express").Router();
const {verify , verifyOrg , verifyCountry}=require('../middleware/middleware');
let { UserValidationByAdmin , UserValidationByOrg , UserValidationByCountry}=require('../utils/SignupAuth')

// admin routes for registering

router.post('/admin-register-admin',verify,(req,res)=>{

    UserValidationByAdmin(req.body,'admin',res,req.user)

})
router.post('/admin-register-ca',verify,(req,res)=>{

    UserValidationByAdmin(req.body,'campus-ambassador',res,req.user)

})

router.post('/admin-register-voulenteer',verify,(req,res)=>{

    UserValidationByAdmin(req.body,'voulenteer',res,req.user)

})

router.post('/admin-register-org',verify,(req,res)=>{

    UserValidationByAdmin(req.body,'organisation',res,req.user)
})

router.post('/admin-register-country',verify,(req,res)=>{

    UserValidationByAdmin(req.body,'country-ambassador',res,req.user)

})
// organisation routes for registering

router.post('/org-register-ca',verifyOrg,(req,res)=>{

    UserValidationByOrg(req.body,'campus-ambassador',res,req.user)

})
router.post('/org-register-voulenteer',verifyOrg,(req,res)=>{

    UserValidationByOrg(req.body,'voulenteer',res,req.user)

})

router.post('/org-register-country',verifyOrg,(req,res)=>{

    UserValidationByOrg(req.body,'country-ambassador',res,req.user)

})

// country register

router.post('/country-register-ca',verifyCountry,(req,res)=>{

    UserValidationByCountry(req.body,'campus-ambassador',res,req.user)

})
router.post('/country-register-voulenteer',verifyCountry,(req,res)=>{

    UserValidationByCountry(req.body,'voulenteer',res,req.user)

})

//--------------------------------------------below not needed now 




router.post('/country-register',(req,res)=>{

    uservalidation(req.body,'country-ambassador',res)

})

router.post('/organisation-register',(req,res)=>{

    uservalidation(req.body,'organisation',res,req,user)

})

router.post('/campus-register',(req,res)=>{

   res.send('hi')

})

router.post('/voulenteer-register',(req,res)=>{

    uservalidation(req.body,'voulenteer',res)

})

module.exports=router;