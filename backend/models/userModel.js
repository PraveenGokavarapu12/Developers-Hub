const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    skills:{
        type:[String],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
    likedPosts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
},{
    timestamps:true
})

module.exports=mongoose.model('User',userSchema)