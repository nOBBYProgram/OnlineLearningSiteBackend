const mongoose = require('mongoose')
const User =require('./userModal')
const reviewModal = require('./ReviewModal')
const Course = require('./courseModal')


const reviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
    ref:User
    },
    reviewId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:reviewModal
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Course
    }
 
},
{timestamps:true})

const FeaturedReviews = mongoose.model('FeaturedReviews',reviewSchema)

module.exports = FeaturedReviews