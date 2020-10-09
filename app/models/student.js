const mongoose = require('mongoose')
const validator=require('validator')
const isNumeric=require('validator/lib/isNumeric')

const Schema = mongoose.Schema // const { Schema } = mongoose 
const studentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }, 
    facultyId: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true
    },   
    courseName:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:[true,'mobile no is required'],
        minlength:10,
        maxlength:10,
        validate:{
            validator:function(value){
                return isNumeric(value)
            },
            message:function(value){
                return 'Invalid format'
            }
        }
    },
    created_at:{
        type:Date,
        default:Date.now
    },
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student

