const mongoose = require('mongoose')

const configureDB = () => {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard-api', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = configureDB