const mongoose = require('mongoose')
const User = require('../Modals/userModal')
const Course = require('./courseModal')

const reviewSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Course
    },
    review:{
        type:String
    }
},
{timestamps:true})

const reviewModal = mongoose.model('reviewModal',reviewSchema)

module.exports = reviewModal