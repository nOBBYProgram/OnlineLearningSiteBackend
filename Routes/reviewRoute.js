const express = require('express')
const { postReview, getReview, getReviewById, deleteReviews } = require('../Controllers/ReviewControl')
const router = express.Router()

router.post('/create',postReview)
router.get('/get',getReview)
router.get('/getReview/:id',getReviewById)
router.delete("/deleteall",deleteReviews)

module.exports = router;