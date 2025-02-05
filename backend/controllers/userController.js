const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/userModel');
const Post=require('../models/postsModel')
//register
//POST /api/users/register

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, skills, password } = req.body;
    if (!name || !email || !skills || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }
    const skillArray = skills.split(",").map(skill => skill.trim().charAt(0).toUpperCase() + skill.trim().slice(1).toLowerCase());
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(401)
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        skills: skillArray,
        password: hashedPassword
    })
    const token = jsonwebtoken.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills
    }, process.env.SECRET_KEY, {
        expiresIn: "30d"
    })
    res.json(
        token
    )
})

//login
//POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("Please fill all fields")
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401)
        throw new Error("User not found")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (user && isMatch) {
        const token = jsonwebtoken.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            skills: user.skills
        }, process.env.SECRET_KEY, {
            expiresIn: "30d"
        })
        res.json(
            token
        )
    }
    else {
        res.status(400)
        throw new Error("Invalid email or password")
    }
    
})

//dashboard
//GET /api/users/dashboard
const dashboard = asyncHandler(async (req, res) => {
    const users=await User.find({}).select("-password")
    res.json(users)
})



//developer details
//GET /api/users/:id
const developerDetails = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
        .select("-password")
    const posts=await Post.find({user_id:req.params.id})
    if (user) {
        res.json({user,posts});
    } else {
        res.status(404);
        throw new Error("User not found");
    }

});

//like a post
//PUT /api/users/like/:id

const likepost=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user.likedPosts.includes(req.params.id)){
        await User.findByIdAndUpdate(req.params.id,{
            $pull:{likes:req.params.id}
        })
        res.json("Post unliked")
    }
    else{
        await User.findByIdAndUpdate(req.params.id,{
            $push:{likes:req.params.id}
        })
        res.json("Post liked")

    }
  

})

//get all liked Posts
//GET /api/users/likedposts
const likedPosts=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id).populate("posts")

    res.json(user.posts)
})






module.exports = { registerUser, loginUser, dashboard, developerDetails,likepost,likedPosts }