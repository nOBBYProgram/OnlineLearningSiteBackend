
const Course = require('../Modals/courseModal')


const createCourse = async(req,res)=>{
    try{
const newCourse = new Course(req.body)
await newCourse.save()

res.status(200).json({success:true,newCourse})

    }
    catch(err){
        console.log(err)
        res.status(500).send("Failed to create a course")
    }
}
const getCourse =async (req,res)=>{
    try{
    const course = await Course.findById(req.params.id)
    
    if(!course){
        res.status(404).send("Course not found")
    }
    res.status(200).json({success:true,course})
    }   
    catch(err){
    console.log(err)
    res.status(500).json({success:false,message:"Internal server error"})
    } 
    }
    
    const getAllCourses = async(req,res)=>{
        try{
    const courses =await Course.find()
    res.status(200).json({success:true,courses})
        }
        catch(err){
            console.log(err)
            res.status(500).json({success:false,message:"Error while fetching the courses!!"})
        }
    }
    
    const deleteCourse = async(req,res)=>{
        const course = req.params.id
        try{
    if(!course){
        res.status(404).send("Course not found")
    }
     await Course.findByIdAndDelete(course)
    
    res.status(200).json({success:true,message:"Course deleted Successfully!"})
        }
        catch(err){
            console.log(err)
            res.status(500).send("Error deleting the Course")
    
        }
    }

    const deleteAllCourse = async(req,res)=>{
        try{
await Course.deleteMany({})

res.status(200).json({success:true,message:'All courses deleted Sucessfully!!'})
        }
        catch(err){
            res.status(500).json({message:'Internal Sever Error'})
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
           res.status(200).json({success:true,matchedCategory})
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

res.status(200).json({success:true,courses})
        }
        catch(err){
            console.log(err)
            res.status(500).json({success:false,message:"Internal Error!!"})
        }
    }

    const getSpecificUserRating = async(req,res)=>{
        const userId = req.params.userId
        const courseId = req.params.courseId
        console.log(userId,courseId)
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
          return  res.status(500).send("Internal Server Error!!")
        }
    }

    const createrCourses = async(req,res)=>{
        const id = req.params.id
        try{
const getCourses = await Course.find({userId:id})

if(!getCourses){
    res.status(404).send("No more courses found!!")
}
res.status(200).json({success:true,getCourses})
        }
        catch(err){
            console.log(err)
            res.status(500).json({success:false,message:"Internal server Error!!"})
        }
    }

    module.exports ={getCourse,getAllCourses,deleteCourse,createCourse,getByCat,rateCourse,filterCourses,createrCourses,getSpecificUserRating,
    deleteAllCourse}