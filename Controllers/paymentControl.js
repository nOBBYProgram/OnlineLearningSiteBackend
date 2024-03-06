const payment = require('../Modals/PaymentModal')
const Course = require('../Modals/courseModal')

const stripe = require('stripe')("sk_test_51Om9daE8zFfxJiB9J4fXyI2D6qhrUWb2JcgleLK3Wib1O1V3N1N3F3Y0VvJX0EaTp7RVRiwiXSYKQt1p75bShTtB00Xh1G0KFt")

const saveCourses = async(req,res)=>{
    const {userId,courses,courseArray} = req.body
 
    console.log("This is save payment",req.body)
    try{

const existingUser = await payment.findOne({userId:userId})

if(existingUser){
    const newCourses = courseArray.filter(course => !existingUser.courses.includes(course))
existingUser.courses = existingUser.courses.concat(newCourses)
    await existingUser.save()
    res.status(200).json(existingUser)
}
else{
const newPayment = new payment({
    userId,
    courses:req.body.courseArray
})

const savePayment = await newPayment.save()

res.status(200).json({success:true,savePayment})
}
    }
    catch(err){
        console.log(err)
       return res.status(500).json({sucess:false,message:"Some internal unknown error!!"})
    }
}



const deleteAll = async (req,res)=>{
    try{
await payment.deleteMany({})
res.status(200).json({success:true,message:'All payments deleted successully!'})
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal Error!!")
    }
}

const payments = async(req,res)=>{
    const {products,userId} = req.body
 
    try{
const lineItems = products?.map((product)=>({
    price_data:{
        currency:"usd",
   
        product_data:{
            name:product.title,
         
            images:[product.img]
        },
        unit_amount:(parseInt(product.price) * 100)
    },
    quantity:1
}))

const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:`http://localhost:3000/success?userId=${userId}&courseId=${products.map(product=>product.id).join(',')}`,
    cancel_url:"http://localhost:3000/cancel"
})
res.status(200).json({id:session.id})
    }
    catch(err){
        console.log(err)
    }
}

const hasUserPuchased = async (userId,courseId)=>{
  
const purcahased = await payment.findOne({userId,courses:{$in: courseId}})

return !!purcahased
  
}

const checkUserPuchase = async(req,res)=>{
        const {userId,courseId} = req.query
        try{
            const userHasPurchased = await hasUserPuchased(userId,courseId)

            res.status(200).json({success:true,hasUserPurchased:userHasPurchased})
        }
        catch(err){
            console.log(err)
            res.status(500).send('Some internal Errro!!')
        }
}
module.exports = {payments,saveCourses,deleteAll,checkUserPuchase}