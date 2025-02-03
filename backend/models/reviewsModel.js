const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    reviewer_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    rating: {
        type: Number,
        required: true,
    }

}, {timestamps: true});

module.exports = mongoose.model('Review', reviewSchema);