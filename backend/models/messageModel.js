const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    receiver_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
});


module.exports= mongoose.model("Message",messageSchema);