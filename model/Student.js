const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({

    personalInfo: "Mixed",
    class: {
        type: String,
        required: [true, 'Please Select Your Class']
    },
    board: {
        type: String,
        required: [true, 'Please Select Your Board']
    },
    stream: {
        type: String,
        default: undefined
    }
})

module.exports = mongoose.model('Students', StudentSchema)