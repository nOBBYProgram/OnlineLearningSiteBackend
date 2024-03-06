const User = require('../Modals/userModal')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async(req,res)=>{
    try{
const {username,email,password,role} = req.body

const existingUser =await User.findOne({username})
if(existingUser){
 return   res.status(400).json({success:false,message:"Username already exists"})
}
const hashedPassword = await bcrypt.hash(password,10)

const newUser = new User(
    {
        username,
        email,
        password:hashedPassword,
        role
    }

)
await newUser.save()

res.status(200).send({success:true,newUser})
    }
    catch(err){
        console.log(err)
    }
}

const login = async(req,res)=>{
    try{
const {username,password} = req.body;

const existingUser = await User.findOne({username})

if(!existingUser){
    return res.status(404).send("User not found")
}

const hashedPassword = await bcrypt.compare(password,existingUser.password)

if(!hashedPassword){
    return res.status(400).json({success:false,message:"Wrong password"})
}
const token = jwt.sign({userId:existingUser._id,role:existingUser.role},process.env.secretKey)

res.cookie('token',token,{httpOnly:true})

res.status(200).json({success:true,existingUser,token})

    }
    catch(err){
        console.log(err)
     return   res.status(500).json({success:false,message:"Internal Server error!"})
    }
}

module.exports = {register,login}