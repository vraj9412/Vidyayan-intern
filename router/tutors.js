const router = require('express').Router()
const StudentContact = require('../model/StudentContact')
const Tutor = require('../model/Tutor')
const TutorContact = require('../model/TutorContact')
router.get('/allTutors', async (req, res, next) => {
    await Tutor.find().then(users => {
        return res.status(200).json({
            success: true,
            users
        })
    }
    ).catch(err => res.status(500).json({ "Error": err }))
})

router.get('/tutor/pendingReq/:number', async (req, res, next) => {
    const number = req.params.number
    await TutorContact.findOne({ number }).then(user => {
        return res.status(200).json({
            success: true,
            pendingReq: user.pendingReq
        })
    })
})
router.post('/tutor/acceptReq', async (req, res, next) => {

    const { sNumber, number } = req.body

    const accept = async () => {
        await TutorContact.updateOne({ number },
            {
                $pull: {
                    pendingReq: sNumber
                }
            }).then(() => console.log('remove from pending'))
            .catch(err => console.log(err))
        await TutorContact.updateOne({ number },
            {
                $addToSet: {
                    available: sNumber
                }
            }).then(() => console.log('added to available'))
            .catch(err => console.log(err))
        await StudentContact.updateOne({ number: sNumber },
            {
                $pull: {
                    sendReq: number
                }
            }).then(() => console.log('remove from pending'))
            .catch(err => console.log(err))
        await StudentContact.updateOne({ number: sNumber },
            {
                $addToSet: {
                    available: number
                }
            }).then(() => console.log('added to available'))
            .catch(err => console.log(err))
    }

    accept().then(() => res.status(200).json({
        success: true,
        message: 'Request Accepted'
    })).catch(err => res.status(500).json({ "Error": err }))
})
router.post('/tutor/rejectReq', async (req, res, next) => {

    const { number, sNumber } = req.body

    const reject = async () => {
        await TutorContact.updateOne({ number },
            {
                $pull: {
                    pendingReq: sNumber
                }
            }).then(() => console.log('remove from tutor pending'))
            .catch(err => console.log(err))
        await StudentContact.updateOne({ number: sNumber },
            {
                $pull: {
                    sendReq: number
                }
            }).then(() => console.log('remove from send req'))
            .catch(err => console.log(err))
    }
    reject().then(() => res.status(200).json({
        success: true,
        message: 'Request Rejected'
    })).catch(err => res.status(500).json({ "Error": err }))
})
module.exports = router