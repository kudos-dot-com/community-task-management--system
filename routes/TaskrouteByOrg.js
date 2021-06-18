const router=require("express").Router();
let {addTask , 
    fetchTask,
    OrgFetchTask,     
    findTask , 
    updateTask }=require('../utils/SetTaskByOrg') //functions for different operartion

const {verify , verifyCountry ,verifyOrg}=require('../middleware/middleware'); //used to verify that token is provided or not


// adding new task routes 
router.post('/organisation-add-task',verifyOrg,(req,res)=>{

    addTask(req,'organisation',res,req.user) 

})
// Country submisiion
router.post('/country-ambassador-add-task-organisation',verifyCountry,(req,res)=>{

    addTask(req,'country-ambassador',res,req.user)
})
// campus submission
router.post('/campus-ambassador-add-task-organisation',verify,(req,res)=>{

    addTask(req,'campus-ambassador',res,req.user)
})

//  voulenteer submission
router.post('/voulenteer-add-task-organisation',verify,(req,res)=>{

    addTask(req,'voulenteer',res,req.user)

})
// ---------------------------------------------------------------------------------------

// get respective tasks routes
// get org task for campus and voulenteers
router.get('/campus-ambassador-get-organisation-task',verify,(req,res)=>{

    fetchTask(req,'organisation','campus-ambassador',res,req.user)
})
router.get('/voulenteer-get-organisation-task',verify,(req,res)=>{

    fetchTask(req,'organisation','voulenteer',res,req.user)
})
// get org task for country only
router.get('/country-ambassador-get-organisation-task',verifyCountry,(req,res)=>{

    fetchTask(req,'organisation','country-ambassador',res,req.user)
})


// organisations gets task update of specific starta(countyr,campus and voulenteer)
//getting country submissions
router.get('/get-country-task-organisation',verifyOrg,(req,res)=>{

    fetchTask(req,'country-ambassador',"",res,req.user)
})
//gettign camppus submissions
router.get('/get-ca-task-organisation',verifyOrg,(req,res)=>{

    fetchTask(req,'campus-ambassador',"",res,req.user)
})
//getting voulenteers submissions updates
router.get('/get-voulenteer-task-organisation',verifyOrg,(req,res)=>{

    fetchTask(req,'voulenteer',"",res,req.user)
})

// <-------------------------------------------------------------------------------------->
//need to work on it

// finding specific routes
router.get('/campus-ambassador-find-task-organisation',verify,(req,res)=>{

   findTask(req.user,'campus-ambassador',res)

})
router.get('/country-ambassador-find-task-organisation',verifyCountry,(req,res)=>{

    findTask(req.user,'country-ambassador',res)
 
 })
router.get('/voulenteer-find-task-organisation',verify,(req,res)=>{

    findTask(req.user,'voulenteer',res)
 
 })
router.get('/org-find-task',verifyOrg,(req,res)=>{

    findTask(req.user,'organisation',res)
 
 })

// update
router.put('/campus-ambassador-update-task-organisation',verifyOrg,(req,res)=>{

    updateTask(req,'campus-ambassador',res)
 
})
router.put('/voulenteer-update-task-organisation',verifyOrg,(req,res)=>{

    updateTask(req,'campus-ambassador',res)
 
})
router.put('/country-ambassador-update-task-organisation',verifyOrg,(req,res)=>{

    updateTask(req,'country-ambassador',res)
 
})


module.exports=router;