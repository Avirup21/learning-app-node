const express=require('express')
const router=express.Router()

const usersController=require('../app/controllers/usersControllers')
const {authenticateUser}=require('../app/middlewares/authentication')
const profileController=require('../app/controllers/profileControllers')
const facultyController=require('../app/controllers/facultyControllers')
const studentController=require('../app/controllers/studentControllers')

router.post('/api/users/register',usersController.register)
router.post('/api/users/login',usersController.login)
//private route
router.get('/api/users/account', authenticateUser ,usersController.account)

router.post('/api/profile',authenticateUser, profileController.create)
router.put('/api/profile/:id', authenticateUser, profileController.update)
router.get('/api/myprofile', authenticateUser, profileController.myProfile)

router.post('/api/faculty',authenticateUser, facultyController.create)
router.get('/api/list', authenticateUser, facultyController.myFaculty)
router.put('/api/faculty/:id', authenticateUser, facultyController.update)
router.get('/api/faculty', authenticateUser,facultyController.list)
router.delete('/api/faculty/:id',authenticateUser, facultyController.destroy)

router.get('/api/view', authenticateUser,studentController.list)
router.post('/api/student',authenticateUser, studentController.create)

module.exports=router