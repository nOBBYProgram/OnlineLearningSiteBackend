const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
try{
const token = req.cookies.token

const decodedToken = jwt.verify(token,process.env.secretKey)

req.user = decodedToken
next()
}
catch(err){
    console.log(err)
    res.status(401).send("Invalid Token")
}
}

const authorizeRoles = (allowedRoles) =>(req,res,next)=>{
    try{
const userRoles = req.user && req.user.role ? req.user.role : []

const intersection = allowedRoles.filter(role => userRoles.includes(role))

if(intersection.length > 0){
    next()
}
else{
    res.status(403).send("Insufficient roles")
}
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error")
    }
}

const verifyUser = (req,res,next)=>{
    try{
if(req.user && req.user.userId && req.user.role){
    const idFromToken = req.user.userId
    const requestedUserId = req.params.id
    if(idFromToken === requestedUserId || req.user.role ==="admin"){
        next()
    }
    else{
        res.status(401).send("You are not allowed to perform this action")
    }
  

}
else{
    res.status(200).send("Invalid information in the request")
}

    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal server error!!")
    }
}

module.exports = {verifyToken,authorizeRoles,verifyUser}