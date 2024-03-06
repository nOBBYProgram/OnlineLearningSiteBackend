const FeaturedReviews = require('../Modals/FeaturedReviews')
const FeatureReviews = require('../Modals/FeaturedReviews')
const createFeatured = async(req,res)=>{
    const{userId,reviewId} = req.body
    console.log("hello",req.body)
    try{
const existingUser = await FeatureReviews.findOne({userId})

if(existingUser){
    existingUser.reviewId = reviewId
    await existingUser.save()
}
else{
    const newFeatured = new FeatureReviews(req.body)
    await newFeatured.save()
}
res.status(200).json({success:true,message:"New Featured review added Successfully!"})

    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Internal Server Error!!"})
    }
}

const getFeaturedReview = async(req,res)=>{
    const courseId = req.params.courseId
    try{
const review = await FeaturedReviews.find({courseId}).populate('courseId')
.populate({ 
    path: 'reviewId', 
    populate: { 
        path: 'userId' 
    } 
});

if(!review){
    return res.status(404).json({success:false,message:"No Feature Review found!"})
}
res.status(200).json({succcess:true,review})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Some Internal Error!!"})
    }
}

const getAllFeaturedReview = async(req,res)=>{
    try{
const featureReviews = await FeatureReviews.find().populate('courseId')
.populate({
    path:'reviewId',
    populate:{
        path:'userId'
    }
})
if(!featureReviews){
   return res.status(404).json({success:false,message:"No feaure Reviews available"})
}
res.status(200).json({succcess:true,featureReviews})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Some internal Error!"})
    }
}

module.exports = {createFeatured,getFeaturedReview,getAllFeaturedReview}