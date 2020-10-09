const bcryptjs=require('bcryptjs')
const User=require('../models/users')
const jwt = require('jsonwebtoken')
const usersController={}

usersController.register=(req,res)=>{
    const body=req.body
    const user=new User(body)
    user.save()
    .then((user)=>{
        console.log(user)
        res.json(user)
    })
    .catch((err)=>{
        res.json(err)
    })
}

usersController.login=(req,res)=>{
    const body=req.body
    // console.log(req.body)
    User.findOne({email:body.email})
    .then((user)=>{
    //   console.log(user)
        if(user){
            bcryptjs.compare(body.password,user.password)
            .then((result)=>{
                console.log(result)
                if(result){
                    const tokenData={
                        id:user._id
                    }
                   const token=jwt.sign(tokenData,'secret@123')
                    res.json({
                        token:token
                    })
                }
                else{
                    res.json({error:'invalid email/password'})
                }
            })
        }
        else{
            res.json({error:'invalid email/password'})
        }
    })
    .catch((err)=>{
        res.json(err)
    })
}

usersController.account = (req, res) => {
    User.findById(req.userId)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports=usersController