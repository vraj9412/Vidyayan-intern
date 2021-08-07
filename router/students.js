const router = require('express').Router()
const Student = require('../model/Student')
const StudentContact = require('../model/StudentContact')
const TutorContact = require('../model/TutorContact')

router.get('/allStudents', async (req, res, next) => {
    await Student.find().then(users => {
        return res.status(200).json({
            success: true,
            users
        })
    }
    ).catch(err => res.status(500).json({ "Error": err }))
})


router.get('/student/pendingReq/:number', async (req, res, next) => {
    const number = req.params.number
    await StudentContact.findOne({ number }).then(user => {
        return res.status(200).json({
            success: true,
            pendingReq: user.sendReq
        })
    })
})
router.post('/student/sendReq', async (req, res, next) => {

    const { sNumber, number } = req.body
    const send = async () => {
        await TutorContact.updateOne({ number },
            {
                $addToSet: {
                    'pendingReq': sNumber
                }
            }).then(() => console.log('added to Tutorial pending Req'))
            .catch(err => console.log(err))

        await StudentContact.updateOne({ number: sNumber },
            {
                $addToSet: {
                    'sendReq': number
                }
            }).then(() => console.log('added to Student send Req'))
            .catch(err => console.log(err))
    }
    send().then(() => res.status(200).json({ success: true, message: 'Request Sent' }))
        .catch(err => res.status(500).json({ "Error": err }))
})

module.exports = router