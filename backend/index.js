const express=require('express');
const http=require('http');
const app=express();
const cors=require('cors')
const dotenv=require('dotenv').config()
const useRoutes=require('./routes/userRoute')
const postRoutes=require('./routes/postsRoute')
const messageRoute=require('./routes/messageRoute')
const {Server}=require('socket.io')
const connectDB=require('./config/dBConfig');
const errorHandler = require('./middleware/errorHandler');
connectDB();
const server=http.createServer(app);



const io=new Server(server,{
  cors:{
    origin:'*'
  }
})
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
app.use('/api/chat',messageRoute)
app.use(errorHandler)

let onlineUsers={};

io.on("connection",(socket)=>{
  console.log(socket.id);

  socket.on('join',(userId)=>{
    onlineUsers[userId]=socket.id;
    console.log(`${userId} is online`)

  })

  socket.on("sendMessage",({senderId,receiverId,message})=>{
    const receiverSocket=onlineUsers[receiverId];
    if(receiverSocket){
      io.to(receiverSocket).emit("receiveMessage",{senderId,message});
    }
  })

  socket.on("disconnect",()=>{
    for (let user in onlineUsers){
      if (onlineUsers[user] === socket.id) {
        delete onlineUsers[user];
        console.log(`${user} is offline`);
        break;
      }
    }
  });



})


server.listen(port,()=>{
    console.log(`connected to ${port}`)
})

