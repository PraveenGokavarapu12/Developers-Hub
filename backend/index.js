const express=require('express');
const app=express();
const cors=require('cors')
const dotenv=require('dotenv').config()
const useRoutes=require('./routes/userRoute')
const review=require('./routes/reviewsRoute')
const connectDB=require('./config/dBConfig');
const errorHandler = require('./middleware/errorHandler');
connectDB();


app.use(cors())
app.use(express.json())


const port=process.env.PORT || 5001



app.use('/api/users',useRoutes)
app.use('/api/reviews',review)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`connected to ${port}`)
})

