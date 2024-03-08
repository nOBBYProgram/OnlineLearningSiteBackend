const Review = require('../Modals/ReviewModal')

const postReview = async(req,res)=>{
    try{
const newReview = new Review(req.body)
await newReview.populate('userId')
await newReview.save()

res.status(200).json({success:true,newReview})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Internal Server Error!!"})
    }
}

const getReview= async(req,res)=>{
    try{
const reviews = await Review.find().populate('userId')
res.status(200).json({success:true,reviews})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Internla Server Error!!"})
    }
}

const getReviewById = async(req,res)=>{
    const {id} = req.params
    console.log("get revies by id",id)
    console.log(id)
    try{
const reviews = await Review.find({courseId:id}).populate('userId courseId')

res.status(200).json({success:true,reviews})
    }
    catch(err){
        console.log(err)
    }
}

const deleteReviews = async(req,res)=>{
    try{
await Review.deleteMany({})

res.status(200).json({success:true,message:"Reviews Deleted Sucessfully"})
    }
    catch(err){
        res.status(500).json({success:false,message:"Internal Server Error!!"})
    }
}

module.exports = {postReview,getReview,getReviewById,deleteReviews}