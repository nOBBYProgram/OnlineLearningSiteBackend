const User = require('../Modals/userModal')


const getUser =async (req,res)=>{
try{
const user = await User.findById(req.params.id)
console.log(req.params.id)
if(!user){
    res.status(404).send("User not found")
}
res.status(200).json({success:true,user})
}   
catch(err){
console.log(err)
res.status(500).json({success:false,message:"Internal server error"})
} 
}

const updateUser = async(req,res)=>{
    console.log(req.body.formData)
    const id = req.params.id
    const {imgUrls,biography} = req.body


    try{
const user = await User.findByIdAndUpdate(id,req.body.formData,{new:true})
if(!user){
    return res.status(404).json({success:false,message:'User not found'})
}
if(imgUrls){
    user.image = imgUrls
    await user.save()
}
if(biography){
    user.biography = biography
    await user.save()
}
res.status(200).json({success:true,message:"user updated Sucessfully",user})
    }
catch(err){
    console.log(err)
    res.status(500).send("SOme Internal Error!!")
}
}
const getAllUser = async(req,res)=>{
    try{
const users =await User.find()
res.status(200).json({success:true,users})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Error while fetching the users!!"})
    }
}

const deleteUser = async(req,res)=>{
    const user = req.params.id
    try{
if(!user){
    res.status(404).send("User not found")
}
 await User.findByIdAndDelete(user)

res.status(200).json({success:true,message:"User deleted Successfully!"})
    }
    catch(err){
        console.log(err)
        res.status(500).send("Error delete the user")

    }
}

module.exports ={getUser,getAllUser,deleteUser,updateUser}