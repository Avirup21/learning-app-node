const mongoose=require('mongoose')
const validator=require('validator')
const isEmail=require('validator/lib/isEmail')
const bcryptjs=require('bcryptjs')
const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true
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
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:5,
        maxlength:126
    },
    // mobile:{
    //     type:String,
    //     required:[true,'mobile no is required'],
    //     minlength:10,
    //     maxlength:10,
    //     validate:{
    //         validator:function(value){
    //             return isNumeric(value)
    //         },
    //         message:function(value){
    //             return 'Invalid format'
    //         }
    //     }
    // },
    // address:{
    //     type:String,
    //     required:[true,'address is required']
    // }
})

userSchema.pre('save',function(next){
    console.log('user')
    const user=this
    bcryptjs.genSalt()
    .then((salt)=>{
        console.log(salt)
        bcryptjs.hash(user.password,salt)
        .then((encryptedPassword)=>{
               console.log(encryptedPassword)
               console.log(user.password)
            user.password = encryptedPassword
            next()
           })
           .catch((err)=>{
               console.log(err)
           })
    })
    .catch((err)=>{
        console.log(err)
    })
})

const User=mongoose.model('User',userSchema)

module.exports=User