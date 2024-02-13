const mongoose = require('mongoose')
const User = require('./userModal')
const courseSchema = mongoose.Schema({
        author:{
            type:String,
            required:true,
        },
      price:{
        type:String,
        default:'free'
      },
      desc:{
        type:String,
      },
      img:{
        type:String
      },
      title:{
        type:String
      },
      subtitle:{
        type:String
      },
      time:{
        type:Number
      },
 
      tags:{
        type:[String]
      },
      courseDesc :{
        type:String
      },
      enrollment:{
        type:Number,
        default:0
      },
      level:{
        type:String,
        enum:['All level','Beginner','Intermediate','Expert']
    
      },
  ratings:[
    {
UserId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:User
},
value:{
  type:Number
}
    }
  ],
averageRating:{
type:Number
},
      curriculum: [
        {
          title: String,
          order: Number,
         
              lessons: [
              String
          ],
        },
      ],
      includes:{
type:[String],
      },
      requirements:{
        type:[String],
        default:"No experince is required"
      },
      
        category:{
          type:String
        },
      whatYouWillLearn:{
        type:[String],
    
      },
    
    },
    {timestamps:true})

    const Course = mongoose.model('Course',courseSchema)

    module.exports = Course;