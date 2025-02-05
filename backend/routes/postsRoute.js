const verifyToken=require('../middleware/verifyToken');
const express=require('express');
const router=express.Router();
const {getPosts,createPost,deletePost,myPosts}=require('../controllers/postsContoller');


router.get('/',verifyToken,getPosts);
router.post('/',verifyToken,createPost);
router.delete('/:id',verifyToken,deletePost);
router.get('/myposts',verifyToken,myPosts);

module.exports=router;