// this collection is for the campus ambasador registed by admin
const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = mongoose.Schema({
    title: {
        type:String,
    },
    description:{
    type:String,
    },
    content: {
        type:String,
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },    
    enrolled:[{user:{type:Schema.Types.ObjectId,ref:'User'},status:{type:String,default:"not enrolled"}}],

    submission:[{user:{type:Schema.Types.ObjectId,ref:'User'},link:{type:String,required:true,status:{type:String,default:"not submitted"}}}]
}, { timestamps: {type: Date, default: Date.now} })


mongoose.model('Blog',blogSchema);