const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/userModel');
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
        res.status(400)
        throw new Error("User already exists")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name,
        email,
        skills: skillArray,
        password: hashedPassword
    })
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills

    })
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
        res.status(400)
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



module.exports = { registerUser, loginUser, dashboard }