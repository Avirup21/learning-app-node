const Profile = require('../models/profile')
const profileController = {}

profileController.myProfile = (req, res) => {
    Profile.find({ userId: req.userId })
        .then((profile) => {
            res.json(profile)
        })
}

profileController.create = (req, res) => {
    const body = req.body
    console.log(body)
    const profile = new Profile(body)
    profile.userId = req.userId 
    profile.save()
        .then((profile) => {
            // console.log(profile.name)
            res.json(profile)
        })
        .catch((err) => {
            res.json(err)
        })
}
profileController.update = (req, res) => {
    const id = req.params.id 
    const body = req.body 
    Profile.findOneAndUpdate({ _id: id, userId: req.userId}, body, { new: true, runValidators: true} )
        .then((profile) => {
            if(profile) {
                res.json(profile)
            } else {
                res.json({})
            }
        })
}

module.exports = profileController