const router=require("express").Router();
let {addTask , 
    fetchTask, 
    findTask , 
    updateTask }=require('../utils/SetTask') //functions for different operartion

const {verify,verifyCountry}=require('../middleware/middleware'); //used to verify that token is provided or not


// adding new task routes 
router.post('/admin-add-task',verify,(req,res)=>{

    addTask(req,'admin',res,req.user) 

})
//country submission
router.post('/country-ambassador-add-task-admin',verifyCountry,(req,res)=>{

    addTask(req,'country-ambassador',res,req.user)

})
//campus submission
router.post('/campus-ambassador-add-task-admin',verify,(req,res)=>{

    addTask(req,'campus-ambassador',res,req.user)

})
//voulenteer submission
 router.post('/voulenteer-add-task-admin',verify,(req,res)=>{

    addTask(req,'voulenteer',res,req.user)

})
// ---------------------------------------------------------------------------------------

// get respective tasks routes
//get admins all posted tasks
router.get('/get-admin-task',verify,(req,res)=>{

    fetchTask('admin',"",req.user,res)
})
// 
router.get('/country-ambassador-get-admin-task',(req,res)=>{

    fetchTask('admin','country-ambassador',"",res)
})
router.get('/campus-ambassador-get-admin-task',(req,res)=>{

    fetchTask('admin','campus-ambassador',"",res)
})
router.get('/voulenteer-get-admin-task',(req,res)=>{

    fetchTask('admin','voulenteer',"",res)
})

//get all ca's posted tasks
router.get('/get-country-task-admin',verify,(req,res)=>{

    fetchTask('country-ambassador',"",req.user,res)
})
router.get('/get-ca-task-admin',verify,(req,res)=>{

    fetchTask('campus-ambassador',"",req.user,res)
})
router.get('/get-voulenteer-task-admin',verify,(req,res)=>{

    fetchTask('voulenteer',"",req.user,res)
})
// <-------------------------------------------------------------------------------------->

// finding specific routes
//campus individual submissions
router.get('/country-ambassador-find-task-admin',verifyCountry,(req,res)=>{

   findTask(req.user,'country-ambassador',res)

})

router.get('/campus-ambassador-find-task-admin',verify,(req,res)=>{

    findTask(req.user,'campus-ambassador',res)
 
 })

 router.get('/voulenteer-find-task-admin',verify,(req,res)=>{

    findTask(req.user,'voulenteer',res)
 
 })

// update
router.put('/campus-ambassador-update-task-admin',verify,(req,res)=>{

    updateTask(req,'campus-ambassador',res)
 
})
router.put('/voulenteer-update-task-admin',verify,(req,res)=>{

    updateTask(req,'campus-ambassador',res)
 
})
router.put('/country-ambassador-update-task-admin',verify,(req,res)=>{

    updateTask(req,'country-ambassador',res)
 
})


module.exports=router;