const express=require('express');
const app=express();
const cors=require('cors')
const dotenv=require('dotenv').config()
const useRoutes=require('./routes/userRoute')
const postRoutes=require('./routes/postsRoute')

const connectDB=require('./config/dBConfig');
const errorHandler = require('./middleware/errorHandler');
connectDB();


app.use(cors({
    origin: '*'
                   
}));
app.use(express.json())


const port=process.env.PORT || 5001


app.get("/", (req, res) => {
  res.json({ message: "Posts API is working!" });
});
app.use('/api/users',useRoutes)
app.use('/api/posts',postRoutes)
app.use(errorHandler)


app.listen(port,()=>{
    console.log(`connected to ${port}`)
})

