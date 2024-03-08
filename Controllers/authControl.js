const User = require('../Modals/userModal')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async(req,res)=>{
    try{
const {username,email,password,role} = req.body

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
}

const existingUser =await User.findOne({$or:[{username},{email}] })
if(existingUser){
const existingField = existingUser.username === username ? 'Username' : 'Email'

return res.status(400).json({success:false,message:`${existingField} already Exists` })
}



if(!password || password.trim() === ""){
    
return res.status(400).json({success:false,message:`Password field cannot be left empty!!` })
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
const {email,password} = req.body;

const existingUser = await User.findOne({email})

if(!existingUser){
    return res.status(400).json({success:false,message:"Email Id does not exist!!"})
}

const hashedPassword = await bcrypt.compare(password,existingUser.password)

if(!hashedPassword){
    return res.status(400).json({success:false,message:"Please Enter a correct password!"})
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