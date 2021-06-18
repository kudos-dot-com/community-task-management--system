// this collection is for the campus ambasador registed by admin
const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const blogEnrollSchema = mongoose.Schema({
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    status: {
        type:String,
        default:"Not Approved"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }}, { timestamps: {type: Date, default: Date.now} })


mongoose.model('BlogEnrollment',blogEnrollSchema);