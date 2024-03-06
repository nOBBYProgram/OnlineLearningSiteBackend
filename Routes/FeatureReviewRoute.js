const express = require('express')
const { createFeatured, getFeaturedReview, getAllFeaturedReview } = require('../Controllers/FeatureReviewControl')
const { verifyToken, verifyUser } = require('../MiddleWares/verifyToken')
const router = express.Router()


router.post('/createFeatured',verifyToken,verifyUser,createFeatured)
router.get('/all',getAllFeaturedReview)
router.get('/featuredReview/:courseId',getFeaturedReview)
module.exports = router
