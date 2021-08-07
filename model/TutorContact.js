const mongoose = require('mongoose')

const TutorContact = new mongoose.Schema({

    number: {
        type: Number,
        required: [true, 'Please Enter Your Number'],
        unique: [true, 'This Number Already Exist']
    },
    pendingReq: {
        type: [Number],
        default: null
    },
    available: {
        type: [Number],
        default: null
    }
})

module.exports = mongoose.model('TutorContacts', TutorContact)