const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    content:{
        type:String,
        required:true,
    },
    
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);