const express = require('express')
const mongoose = require('mongoose')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const auth = require('./Routes/authRoute')
const user = require('./Routes/userRoute')
const course = require('./Routes/courseRoute')
const featured = require('./Routes/FeatureReviewRoute')
const cookieParser = require('cookie-parser')
const review = require('./Routes/reviewRoute')
const api = require('./Routes/SignUpload')
const payment = require('./Routes/PaymentRoute')
const port = process.env.PORT || 5000
dotenv.config()
const connectToMongo = async()=>{
    try{
await mongoose.connect(process.env.Mongodb)
console.log("Connected to mongodb")

    }
    catch(err){
        console.log("Failed to connect to mongoDb",err.message)
     
    }
}
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/auth',auth)
app.use('/payment',payment)
app.use('/user',user)
app.use('/api',api)
app.use('/course',course)
app.use('/review',review)
app.use('/featured',featured)
app.listen(5000,()=>{
    connectToMongo()
    console.log(`Port running on ${port}`)

})