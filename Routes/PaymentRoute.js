const express = require('express')
const { payments, saveCourses,  deleteAll, checkUserPuchase} = require('../Controllers/paymentControl')

const router = express.Router()

router.post('/chekout-session',payments)
router.delete('/all',deleteAll)
router.post('/save-courses',saveCourses)

router.get('/check-payment',checkUserPuchase)

module.exports = router