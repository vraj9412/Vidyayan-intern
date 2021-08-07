const mongoose = require('mongoose')

const StudentContact = new mongoose.Schema({

    number: {
        type: Number,
        required: [true, 'Please Enter Your Number'],
        unique: [true, 'This Number Already Exist']
    },
    sendReq: {
        type: [Number],
        default: null
    },
    available: {
        type: [Number],
        default: null
    }
})

module.exports = mongoose.model('StudentsContacts', StudentContact)