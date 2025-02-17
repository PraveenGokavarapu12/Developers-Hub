const asyncHandler=require("express-async-handler");
const Message=require("../models/messageModel");

//send Message
//POST /send/:id

const sendMessage=asyncHandler(async(req,res)=>{
     const {message}=req.body;
     try{
        const newMessage=await Message.create({
            content:message,
            sender_id:req.user._id,
            receiver_id:req.params.id
         })
         res.status(200).json(newMessage);

     }
     catch(err){
        res.status(503).send(err)
     }
     

})


//get messages
// Get /:id

const getMessages=asyncHandler(async (req, res) => {
    const user1=req.user._id;
    const user2=req.params.id
  
    try {
      const messages = await Message.find({
        $or: [
          { sender_id: user1, receiver_id: user2 },
          { sender_id: user2, receiver_id: user1 },
        ],
      })
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
    }
  });


  module.exports={getMessages,sendMessage}

