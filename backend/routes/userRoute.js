const express=require('express');
const { registerUser, loginUser, dashboard, developerDetails,likepost,likedPosts} = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const router=express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/dashboard',verifyToken,dashboard)
router.get('/developer/:id',verifyToken,developerDetails)
router.put('/like/:id',verifyToken,likepost)
router.get('/likedposts',verifyToken,likedPosts)




module.exports=router