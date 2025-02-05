const asyncHandler=require('express-async-handler');
const Post=require('../models/postsModel');
const User=require('../models/userModel');


//get all posts
//Get /api/posts

const getPosts=asyncHandler(async(req,res)=>{
    const posts=await Post.find({}).populate('user_id','name email').sort({createdAt:-1});
    res.json(posts)
});

//create post
//Post /api/posts

const createPost=asyncHandler(async(req,res)=>{
    const {content}=req.body;
    const post=await Post.create({
        user_id:req.user._id,
        content
    })
    

    res.json(post)
});

//delete post
//Delete /api/posts/:id

const deletePost=asyncHandler(async(req,res)=>{
    const post=await Post.findById(req.params.id);
    if(post.user_id.toString()!==req.user._id.toString()){
        res.status(401)
        throw new Error("Not authorized to delete this post")
    }
    if(post){
        await Post.findByIdAndDelete(req.params.id)
        res.json({message:"Post removed"})
    }else{
        res.status(404)
        throw new Error("Post not found")
    }
})

//get myposts
//Get /api/posts/myposts

const myPosts=asyncHandler(async(req,res)=>{
    const posts=await Post.find({user_id:req.user._id}).sort({createdAt:-1})
    res.json(posts)
});


module.exports={
    getPosts,
    createPost,
    deletePost,myPosts}