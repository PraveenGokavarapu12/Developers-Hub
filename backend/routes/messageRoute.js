const express=require("express");
const { getMessages, sendMessage } = require("../controllers/messageController");
const verifyToken = require("../middleware/verifyToken");
const router=express.Router()


router.get('/:id',verifyToken,getMessages);

router.post('/send/:id',verifyToken,sendMessage);


module.exports=router;