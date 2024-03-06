
const Course = require('../Modals/courseModal')


const createCourse = async(req,res)=>{
    try{
const newCourse = new Course(req.body)
await newCourse.save()

return res.status(200).json({success:true,newCourse})

    }
    catch(err){
        console.log(err)
       return res.status(500).send("Failed to create a course")
    }
}
const getCourse =async (req,res)=>{
    console.log(req.params.id)
    try{
    const course = await Course.findById(req.params.id).populate('userId')
    
    if(!course){
       return res.status(404).send("Course not found")
    }
    return res.status(200).json({success:true,course})
    }   
    catch(err){
    console.log(err)
    return res.status(500).json({success:false,message:"Internal server error"})
    } 
    }

    const getLatestCourse = async(req,res)=>{
        const {category} = req.query
        try{
      
                let courses
                if(category){
    courses = await Course.find({tags:{$in:[category]}}).sort({createdAt:-1})
                }
                else{
         courses = await Course.find().sort({createdAt:-1})
                }
          if(!courses){
            res.status(404).json({success:false,message:"Course not found!!"})
        }
res.status(200).json({success:true,courses})
        }
        catch(err){
            console.log(err)
            res.status(500).json({success:false,message:"Some Internal Error!!"})
        }
    }
    
    const getPopularCourse = async(req,res)=>{
        const {category} = req.query
    console.log(category)
        try{
            let courses
            if(category){
courses = await Course.find({tags:{$in:[category]}}).sort({averageRating:-1})
            }
            else{
     courses = await Course.find().sort({averageRating:-1})
            }
      if(!courses){
        res.status(404).json({success:false,message:"Course not found!!"})
    }
res.status(200).json({success:true,courses})     
}
        catch(err){
            console.log(err)
        }
    }
    
    const getAllCourses = async(req,res)=>{
        try{
    const courses =await Course.find()
   return res.status(200).json({success:true,courses})
        }
        catch(err){
            console.log(err)
           return res.status(500).json({success:false,message:"Error while fetching the courses!!"})
        }
    }
    
    const deleteCourse = async(req,res)=>{
        const course = req.params.id
        try{
    if(!course){
      return  res.status(404).send("Course not found")
    }
     await Course.findByIdAndDelete(course)
    
   return res.status(200).json({success:true,message:"Course deleted Successfully!"})
        }
        catch(err){
            console.log(err)
           return res.status(500).send("Error deleting the Course")
    
        }
    }

    const deleteAllCourse = async(req,res)=>{
        try{
await Course.deleteMany({})

  return res.status(200).json({success:true,message:'All courses deleted Sucessfully!!'})
        }
        catch(err){
       return     res.status(500).json({message:'Internal Sever Error'})
        }
    }
    const getByCat = async(req,res)=>{
        const cat = req.query.cat
        
        let matchedCategory 
        try{
        
           if(cat){
            matchedCategory = await Course.find({tags:{$in :[cat]}})//checks if any of the value matches in the array

           }
           else{
matchedCategory = await Course.find()
           }
         return  res.status(200).json({success:true,matchedCategory})
        }
        catch(err){
            console.log(err)
        }
    }

    const rateCourse=async(req,res)=>{
const {userId,courseId,rating} = req.body
console.log("ratings",req.body,courseId,userId)
try{
const course =await Course.findById(req.body.courseId)

if(!course){
   return res.status(400).json({success:false,message:"Course not found!"})

}


const existingRating = course.ratings.find(rating=>rating.UserId?.toString() === userId)

if(existingRating){
    existingRating.value = rating
  
}
else{
  course.ratings.push({UserId:userId,value:rating})
}

const totalRatings = course.ratings.length
const sumRatings = course.ratings.reduce((acc,current)=>acc+current.value,0)

const averageRating = totalRatings > 0 ?sumRatings / totalRatings : 0
course.averageRating = averageRating
 await course.save()
 return res.status(200).json({success:true,message:"Ratings added Succesfully!"})
}
catch(err){
    console.log(err)
    return res.status(500).send("Internal error!!")
}
    }

    const filterCourses = async (req,res)=>{
        const {time,rating,price,level,cat,category} = req.query
        console.log(time,rating,price,level,cat)
        try{
const query = {}

if(time){
const [start,end] = time.split('-').map(Number)//'-' is the delimeter and its gives us a array of strings but we want nummber to compare so .map(Number)

query.time = {$gte:start,$lte:end}
}
if(cat){
    query.tags = {$in:[cat]}
}
if(category){
    query.tags = {$in:[category]}
}
if(rating){
query.averageRating = {$gte:rating}
}
if(price){
if(price.toLowerCase()==='free'){
    query.price = price
}
else{
    query.price = {$ne :'free'}
}
}
if(level){
    query.level =level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()
}

const courses = await Course.find(query)

return res.status(200).json({success:true,courses})
        }
        catch(err){
            console.log(err)
        return    res.status(500).json({success:false,message:"Internal Error!!"})
        }
    }

    const getSpecificUserRating = async(req,res)=>{
        const userId = req.params.userId
        const courseId = req.params.courseId
        console.log("this si it",userId,courseId)
        try{
            const course = await Course.findById(courseId)

            if(!course){
            return    res.status(404).json({success:false,message:"Course not found!!"})
            }

               const userRating =await  course.ratings.find(rating => rating.UserId.toString() === userId)

         if(!userRating){
           return res.status(400).json({message:"User have not rated this course yet!!"})
         }
     return    res.status(200).json({success:true,userRating})
     
        }
        catch(err){
            console.log(err)
          return  res.status(500).send("Internal Server Error!!")
        }
    }

    const createrCourses = async(req,res)=>{
        const id = req.params.id
        console.log("creater id",id)
        try{
const getCourses = await Course.find({userId:id})

if(!getCourses){
  return  res.status(404).send("No more courses found!!")
}
res.status(200).json({success:true,getCourses})
        }
        catch(err){
            console.log(err)
         return   res.status(500).json({success:false,message:"Internal server Error!!"})
        }
    }

    const userRated = async(id,course)=>{
    
        try{
    const alreadyRated =  course.ratings.some(item=>item.UserId == id)
    return !!alreadyRated
        }
        catch(err){
            console.log(err)
        }
    }
    
    const alreadyRated = async(req,res)=>{
        const {id,courseId} = req.params
     
        try{
             const course = await Course.findById(courseId)

             if(!course){
               return res.status(404).send("Course not found!!")
             }
            
                const hasUserRated = await userRated(id,course)


            
            res.status(200).json({success:true,userHaveRated:hasUserRated})
        }
        catch(err){
            console.log(err)
            res.status(500).send('Internal Server Error!!')
        }
    }

    module.exports ={getCourse,getAllCourses,deleteCourse,createCourse,getByCat,rateCourse,filterCourses,getSpecificUserRating,
    deleteAllCourse,alreadyRated,getLatestCourse,getPopularCourse,createrCourses}