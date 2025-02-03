const express=require('express');
const { registerUser, loginUser, dashboard } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const router=express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/dashboard',verifyToken,dashboard)



module.exports=router