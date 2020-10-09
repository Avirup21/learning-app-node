const mongoose = require('mongoose')
const validator=require('validator')
const isNumeric=require('validator/lib/isNumeric')
const isEmail=require('validator/lib/isEmail')

const Schema = mongoose.Schema // const { Schema } = mongoose 
const profileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    }, 
    name: {
        type: String,
        required: [true,'name required']//custom message
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(value){
                return 'Invalid email format'
            }
        }
    },
    mobile: {
        type: String,
        required: [true,'mobile no is require'],
        minlength:10,
        maxlength:10,
        //custom validations
        validate:{
            validator:function(value)//(true?validation is true:validation is false)
            {
                return validator.isNumeric(value)
            },
            message:function(){
                return 'mobile should contain only numbers'
            }
        }
    },
    about_me: {
        type: String
    },
    country:{
        type:String
    },
    company:{
        type:String
    },
    school:{
        type:String
    },
    hometown:{
        type:String
    },
    languages:{
        type:String
    },
    gender:{
        type:String
    },
    created_at:{
        type:Date,
        default:Date.now
    },
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile

