const mongoose = require('mongoose')
const User = require('./userModal')
const Course = require('./courseModal')
const paymentSchema =new mongoose.Schema({
userId:{
type:mongoose.Schema.Types.ObjectId,
ref:User
},
courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Course // Assuming you have a Course model
  }]

},
{timestamps:true})

const paymentModal = new mongoose.model('paymentModal',paymentSchema)

module.exports = paymentModal