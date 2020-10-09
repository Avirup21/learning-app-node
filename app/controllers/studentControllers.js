const Student = require('../models/student')
const studentController = {}

studentController.list = (req, res) => {
    Student.find()
        .then((student) => {
            res.json(student)
        })
        .catch((err) => {
            res.json(err)
        })
}

studentController.create = (req, res) => {
    const body = req.body
    console.log(body)
    const student = new Student(body)
    student.userId = req.userId 
    student.save()
        .then((student) => {
            // console.log(student.name)
            res.json(student)
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports = studentController