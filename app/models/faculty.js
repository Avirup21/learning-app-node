const mongoose = require('mongoose')

const Schema = mongoose.Schema // const { Schema } = mongoose 
const facultySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }, 
    courseId: {
        type: String,
        required: true
    },
    courseName:{
        type:String,
        required: true
    },
   courseDept:{
       type:String,
       required: true
   },
   description:{
       type:String
   },
    courseRoom:{
        type:String
    },
    waitlist:{
        type:String
    },
    courseTeam:{
        type:String
    },
    created_at:{
        type:Date,
        default:Date.now
    },
})

const Faculty = mongoose.model('Faculty', facultySchema)

module.exports = Faculty

