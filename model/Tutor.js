const mongoose = require('mongoose')

const TutorSchema = new mongoose.Schema({

    personalInfo: "Mixed",
    qualification: {
        type: String,
        required: [true, 'Please Enter Your Last Qualification']
    },
    college: {
        type: String,
        required: [true, 'Please Enter your college']
    },
    teachingMode: {
        type: String,
        required: [true, 'Please Select your teaching mode']
    },
    currentStatus: {
        type: String,
        required: [true, 'Please Enter Your current Status']
    },
    language: {
        type: String,
        required: [true, 'Please Select Your Teaching Language']
    },
    subject: {
        type: String,
        required: [true, 'Please Select Subject of Teaching']
    },
    class: {
        type: String,
        required: [true, 'Please Select Your Class']
    },
    board: {
        type: String,
        required: [true, 'Please Select Your Board']
    },
    timing: {
        type: String,
        required: [true, 'Please Select Your Time']
    },
    currentOccupation: {
        type: String,
        required: [true, 'Please Select Your current Occupation']
    },
    charge: {
        type: String,
        required: [true, 'Please Enter Your charges']
    }
})

module.exports = mongoose.model('Tutor', TutorSchema)