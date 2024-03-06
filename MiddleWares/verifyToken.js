const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
try{
const token = req.cookies.token || req.headers.authorization.split(' ')[1] // its deafult format is `bearer token` so we are splting and now it is  ['bearer', 'token']
console.log(token)
const decodedToken = jwt.verify(token,process.env.secretKey)

req.user = decodedToken // attaching the decoded in req.user...
console.log("This is user",req.user)
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

const verifyUser = (req, res, next) => {
    try {
        const { userId, role } = req.user;
        const createrId = req.query.userId;
console.log(createrId,"Here is creater id")
        if (userId && role) {
            if (userId === createrId || role === "admin") {
                next(); // User is authorized, proceed to the next middleware
            } else {
                res.status(401).send("You are not allowed to perform this action");
            }
        } else {
            res.status(400).send("Invalid information in the request");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error!!");
    }
}


module.exports = {verifyToken,authorizeRoles,verifyUser}