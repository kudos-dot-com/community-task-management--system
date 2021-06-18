const router=require("express").Router();
let {addTask , 
    fetchTask,
    OrgFetchTask,     
    findTask , 
    updateTask }=require('../utils/SetTaskByCountry') //functions for different operartion

const {verify , verifyCountry ,verifyOrg}=require('../middleware/middleware'); //used to verify that token is provided or not


// adding new task routes 
router.post('/country-ambassador-add-task',verifyCountry,(req,res)=>{

    addTask(req,'country-ambassador',res,req.user) 

})

// campus submission
router.post('/campus-ambassador-add-task-country',verify,(req,res)=>{

    addTask(req,'campus-ambassador',res,req.user)
})

//  voulenteer submission
router.post('/voulenteer-add-task-country',verify,(req,res)=>{

    addTask(req,'voulenteer',res,req.user)

})
// ---------------------------------------------------------------------------------------

// get respective tasks routes
// get org task for campus and voulenteers
router.get('/campus-ambassador-get-country-task',verify,(req,res)=>{

    fetchTask(req,'country-ambassador','campus-ambassador',res,req.user)
})
router.get('/voulenteer-get-country-task',verify,(req,res)=>{

    fetchTask(req,'country-ambassador','voulenteer',res,req.user)
})


// organisations gets task update of specific starta(countyr,campus and voulenteer)
//gettign camppus submissions

router.get('/get-ca-task-country-ambassador',verifyCountry,(req,res)=>{

    fetchTask(req,'campus-ambassador',"",res,req.user)
})
//getting voulenteers submissions updates
router.get('/get-voulenteer-task-country-ambassador',verifyCountry,(req,res)=>{

    fetchTask(req,'voulenteer',"",res,req.user)
})


// <-------------------------------------------------------------------------------------->
//needs imporovement
// finding specific routes
router.get('/campus-ambassador-find-task-country',verify,(req,res)=>{

   findTask(req.user,'campus-ambassador',res)

})
router.get('/voulenteer-find-task-country',verify,(req,res)=>{

    findTask(req.user,'voulenteer',res)
 
 })

router.get('/country-find-task',verifyCountry,(req,res)=>{

    findTask(req.user,'country-ambassador',res)
 
 })
// 
 router.put('/campus-ambassador-update-task-country',verifyCountry,(req,res)=>{

    updateTask(req,'campus-ambassador',res)
 
})
router.put('/voulenteer-update-task-country',verifyCountry,(req,res)=>{

    updateTask(req,'campus-ambassador',res)
 
})



module.exports=router;