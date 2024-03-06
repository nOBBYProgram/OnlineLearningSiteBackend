var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
       secure:true
})

 const generateSignature = async(req,res,next)=>{
    const {folder} = req.body
console.log(folder)
    if(!folder){
        return res.status(400).send("folder name is requires!!")
    }
    try{
const timestamp = Math.round((new Date).getTime()/100)
console.log(timestamp)
const signature = cloudinary.utils.api_sign_request({
    timestamp,
    folder
},process.env.API_SECRET)

res.status(200).json(
    {
        timestamp,
        signature
    }
)
    }
    catch(err){
        console.log(err)
    }
}

module.exports ={generateSignature}