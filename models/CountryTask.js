const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema.Types;
const CountryTaskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    media:{
        type:String,
        required:false
    },
    taskmedia:{
        type:String,
        required:false,
        default:"NA"
    },
    points:{
        type:String,
        default:"0",
        required:true
    },
    assigned:{
        type:String,
        required:false
    },
    PointsGained:{
        type:String,
        default:"0",
        required:true
    },
    status:{
       type:"string",
       default:"not approved",
       required:false 
    },
    task_id:{
        type:String,
        required:false
    },
   role:{
        type:String,
        required:true,
        enum:["campus-ambassador","voulenteer","country-ambassador","organisation","admin"]
    },
    country:{
        required:false,
        type:ObjectId,
        ref:"Country"
    },
    user:{
        required:false,
        type:ObjectId,
        ref:"User"
    },

},
{
    timestamps:true
}
);

mongoose.model('CountryTask',CountryTaskSchema);