const router = require('express').Router();
const PersonalInfo = require('../model/PersonalDetail')
const Student = require('../model/Student')
const Tutor = require('../model/Tutor')
const TutorContact = require('../model/TutorContact')
const StudentContact = require('../model/StudentContact')

//get Existing User
router.post('/login', async (req, res, next) => {

    const { number } = req.body

    await PersonalInfo.findOne({ number }).then(async (usr) => {

        if (!usr) {
            return res.status(404).json({
                success: false,
                user: null
            })
        }

        usr.type == 'Student' ?
            await Student.findOne({
                'personalInfo.number': usr.number
            }).then(user => {
                res.status(200).json({
                    success: true,
                    user
                })
            }).catch(err => res.status(500).json({ "Error": err })) :
            await Tutor.findOne({
                personalInfo: { number: usr.number }
            }).then(user => {
                res.status(200).json({
                    success: true,
                    user
                })
            }).catch(err => res.status(500).json({ "Error": err }))

    }).catch(err => res.status(500).json({ "Error": err }))
})
//register new user
router.post('/newUser', async (req, res, next) => {
    const {
        number,
        firstName,
        lastName,
        fatherFirstName,
        fatherLastName,
        gender,
        dob,
        email,
        add,
        city,
        pincode,
        type } = req.body
    const newUser = new PersonalInfo({
        number,
        firstName,
        lastName,
        fatherFirstName,
        fatherLastName,
        gender,
        dob,
        email,
        add,
        city,
        pincode,
        type
    })

    await newUser.save().then(() => {
        res.status(201).json({
            success: true,
            newUser
        })
    }).catch(err => res.status(500).json({ "Error": err }))
})

//register user as student or tutor
router.post('/register/:type', async (req, res, next) => {

    const type = req.params.type
    let newUser = null
    let contact = null
    if (type === 'Student') {
        newUser = new Student({
            personalInfo: req.body.personalInfo,
            class: req.body.class,
            board: req.body.board,
            stream: req.body.stream
        })
        contact = new StudentContact({
            number: req.body.personalInfo.number
        })
    }
    else {
        newUser = new Tutor({
            personalInfo: req.body.personalInfo,
            class: req.body.class,
            board: req.body.board,
            stream: req.body.stream,
            qualification: req.body.qualification,
            college: req.body.college,
            teachingMode: req.body.teachingMode,
            currentStatus: req.body.currentStatus,
            language: req.body.language,
            subject: req.body.subject,
            timing: req.body.timing,
            currentOccupation: req.body.currentOccupation,
            charge: req.body.charge
        })
        contact = new TutorContact({
            number: req.body.personalInfo.number
        })
    }

    await newUser.save()
        .then(async () => {
            await contact.save().then(() => {
                return res.status(201).json({
                    success: true,
                    newUser
                })
            }).catch(err => res.status(500).json({ "Error": err }))
        }).catch(err => res.status(500).json({ "Error": err }))
})

module.exports = router;