const mongoose = require('mongoose')

const PersonalInfoSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'Please Enter Your Mobile Number'],
        unique: [true, 'This Number Already Exist']
    },
    firstName: {
        type: String,
        required: [true, 'Please Enter Your First Name']
    },
    lastName: {
        type: String,
        required: [true, 'Please Enter Your LastName']
    },
    fatherFirstName: {
        type: String,
        required: [true, 'Please Enter Your Father\'s First Name']
    },
    fatherLastName: {
        type: String,
        required: [true, 'Please Enter Your Father\'s LastName']
    },
    gender: {
        type: String,
        required: [true, 'Please Enter Your Gender']
    },
    dob: {
        type: String,
        required: [true, 'Please Enter your Birth Date']
    },
    email: {
        type: String,
        required: [true, 'Please Enter you Email']
    },
    add: {
        type: String,
        required: [true, 'Please Enter you Address']
    },
    city: {
        type: String,
        required: [true, 'Please Enter your city']
    },
    pincode: {
        type: Number,
        required: [true, 'please Enter your pincode']
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('PersonalInfo', PersonalInfoSchema)