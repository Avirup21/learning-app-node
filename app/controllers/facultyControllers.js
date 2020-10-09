const Faculty = require('../models/faculty')
const facultyController = {}

facultyController.list = (req, res) => {
    Faculty.find()
        .then((faculty) => {
            res.json(faculty)
        })
        .catch((err) => {
            res.json(err)
        })
}

facultyController.myFaculty = (req, res) => {
    Faculty.find({ userId: req.userId })
        .then((faculty) => {
            res.json(faculty)
        })
}

facultyController.create = (req, res) => {
    const body = req.body
    console.log(body)
    const faculty = new Faculty(body)
    faculty.userId = req.userId 
    faculty.save()
        .then((faculty) => {
            // console.log(faculty.name)
            res.json(faculty)
        })
        .catch((err) => {
            res.json(err)
        })
}
facultyController.update = (req, res) => {
    const id = req.params.id 
    const body = req.body 
    Faculty.findOneAndUpdate({ _id: id, userId: req.userId}, body, { new: true, runValidators: true} )
        .then((faculty) => {
            if(faculty) {
                res.json(faculty)
            } else {
                res.json({})
            }
        })
}
facultyController.destroy = (req, res) => {
    const id = req.params.id
    Faculty.findByIdAndDelete({_id: id, userId: req.userId })
        .then((faculty) => {
            if (faculty) {
                res.json(faculty)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}


module.exports = facultyController