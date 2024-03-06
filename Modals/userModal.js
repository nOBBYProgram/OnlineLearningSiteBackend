const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    Website:{
        type:String
    },
    Twitter:{
        type:String
    },
    biography:{
        type:String
    },
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    image:{
        type:String
    },
    Facebook:{
        type:String
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['admin','user'],
      default:'user'
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User